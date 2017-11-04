import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { DataStorageService } from './services/data-storage.service';
import { UserContext } from './main/profile/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private authService: AuthService,
              private dsService: DataStorageService,
              private router: Router,
              // private route: ActivatedRoute,
              private location: Location){}


  ngOnInit(): void {

  }

  ngAfterViewInit(){
    if(this.authService.isAuthenticated()) {
      if(!this.authService.hasLogged){
        if(!this.authService.hasRefreshed){
          this.refreshUserCtx();
        }
      }
      if(this.location.path().indexOf('main') < 0 )
        this.router.navigate(['/main/home']);
    }
    else {
      this.authService.checkSession().subscribe(
        (res: UserContext) => {
          console.log('Session exists!');
          console.debug('activated route', this.location.path());
          let userContext = res;//.json();
          this.authService.storeAuthInfo(userContext.user);
          this.dsService.storeUserContext(userContext);
          if(this.location.path().indexOf('main') < 0 )
            this.router.navigate(['/main/home']);
        },
        error => {
          // console.log(error);
          console.log('No active session found.');
          // this.authService.logOut();
        })
    }
  }

  refreshUserCtx(){
    let userId = this.dsService.getUserId();
    console.log('refreshing userCtx, userId='+userId);

    this.authService.refreshUserFromServer(userId).subscribe(
      (userCtx: UserContext) => {
        this.authService.storeAuthInfo(userCtx.user);
        this.dsService.storeUserContext(userCtx);

      }
    );
  }
}
