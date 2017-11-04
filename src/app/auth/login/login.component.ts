import { AfterViewInit, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DataStorageService } from '../../services/data-storage.service';
import { AuthService } from '../auth.service';
import { UserContext } from '../../main/profile/user.model';

declare const gapi: any;

export interface LoginUser {
  userName: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {

  @BlockUI() blockUI: NgBlockUI;

  loginUser: LoginUser = {userName: '', password: ''};
  rememberMe: boolean;
  /*userName: string;
  password: string;*/
  isError: boolean = false;
  errorMsg: string;
  forceLogin: boolean = false;

  constructor(private authService: AuthService,
              private dsService: DataStorageService,
              private router: Router,
              private zone: NgZone) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    gapi.load('auth2', () => {
      let auth = gapi.auth2.init({
        client_id: '90111058406-ca62uli8c9i31qard5o5atk5mf9d07tl.apps.googleusercontent.com'
      });

      if (auth.isSignedIn.get()) {
        console.log(auth.currentUser.get());
        this.loginUser.userName = auth.currentUser.get().getBasicProfile().getEmail();
        this.loginUser.password = 'xxxxxxxxxxxxxx';
        this.forceLogin = true;
      }
      /*else*/ {
        this.zone.run(() => auth.attachClickHandler(document.getElementById('googleBtn'), {},
          (googleUser) => {
            console.log('google User logged successfully');
            console.log(googleUser.getBasicProfile().getEmail());
            this.zone.run(() => {
              this.forceLogin = true;
              this.onGoogleSignIn(googleUser.getBasicProfile());
            });
          },
          (error) => {
            console.error('ERROR')
          }));
      }
    });
  }

  onGoogleSignIn(googleUser){
    this.blockUI.start('Signing in...');
    this.loginUser.userName = googleUser.getEmail();
    this.loginUser.password = 'xxxxxxxxxxxxxxxx';
    this.doLogin();
  }

  onSubmit(form: NgForm) {
    console.log('ON SUBMIT');
    this.errorMsg = null;
    this.doLogin();
  }

  doLogin() {
    this.blockUI.start('Signing in...');
    this.authService.authenticate(this.loginUser, this.forceLogin, this.rememberMe)
      .subscribe(
        (response: UserContext) => {
          console.log(response);
          setTimeout(() => {
            this.handleLogin(response);
          }, 1000);
        },
        error => {
          console.debug('ERROR!', error);
          this.handleError(error);
        }
      );
  }

  handleLogin(userContext: UserContext) {
    this.authService.storeAuthInfo(userContext.user);
    this.dsService.storeUserContext(userContext);
    this.router.navigate(['/main/home']);
  }

  handleError(error) {
    this.isError = true;
    this.authService.hasLogged = false;
    try{
      let errorBody = error.json();
      this.errorMsg = errorBody.message ? errorBody.message : 'Something went wrong. Please try again.';
    }
    catch(e) {
      console.warn('Could not parse the error. Probably a server deployment error');
      this.errorMsg = 'Something went wrong. Please try again.';
    }
    // let errorBody = error;
    this.blockUI.stop();
  }

  ngOnDestroy(){
    this.blockUI.stop();
  }
}
