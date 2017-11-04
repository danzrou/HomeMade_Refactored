import { Injectable, NgZone } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
// import 'rxjs/add/operator/map';
import { GenericServerService } from '../services/generic.service';
import { LocalStorageService } from '../services/local-storage.service';
import { LoginUser } from './login/login.component';
import { RegistrationUser } from './register/register.component';
import { HttpClient } from '@angular/common/http';

declare const gapi: any;

@Injectable()
export class AuthService extends GenericServerService {
  private lsUserKey = 'User';

  public hasLogged: boolean = false;
  public hasRefreshed: boolean = false;
  private resourceUrl = 'login';

  constructor(private http: Http,
              private http2: HttpClient,
              private router: Router,
              protected lsService: LocalStorageService,
              private zone: NgZone) {
    super();
  }

  public authenticate(/*userName: string, password: string*/loginUser: LoginUser, forceLogin: boolean, rememberMe: boolean) {
    let options = {
     /* method: 'POST',
      headers: this.headers,*/
      withCredentials: true,
      params: {
        force: String(forceLogin),
        remember: String(rememberMe)
      }
    };

    return this.http2.post(this.baseUrl+'login', {userName: loginUser.userName, password: loginUser.password}, options);
    /*return this.http.post(this.baseUrl+'login', {userName: loginUser.userName, password: loginUser.password}, options)
      .map(response => response.json());*/
  }

  public register(regUser: RegistrationUser){
    /*let options = {
      method: 'POST',
      headers: this.headers
    };*/

    /*return this.http.post(this.baseUrl+'register', regUser, options)
      .map(response => response.json());*/

    return this.http2.post(this.baseUrl+'register', regUser);
  }

  public updateUser(regUser: RegistrationUser){
    /*return this.http.post(this.baseUrl+'register/update', regUser, this.defOptions)
      .map(response => response.json());
*/
    return this.http2.post(this.baseUrl+'register/update', regUser);
  }

  public logOut(){
    this.hasLogged = false;
    this.lsService.clear();

    // this.http.get(this.baseUrl+'logout',  this.defOptions).subscribe();
    this.http2.get(this.baseUrl+'logout').subscribe();

    try {
      let auth2 = gapi.auth2.getAuthInstance();
      /* let auth2 = gapi.auth2.init({
         client_id: '90111058406-ca62uli8c9i31qard5o5atk5mf9d07tl.apps.googleusercontent.com',
         scope: 'profile userName'
       });*/
      auth2.signOut().then(() => {
        console.log('User signed out.');
        // this.zone.run(() => this.router.navigate(['/home']));
      });
    }
    catch(e){
      console.warn('Could not get Google auth instance')
    }

    this.router.navigate(['/home']);
  }

  public storeAuthInfo(userData){
    this.hasLogged = true;
    this.lsService.addItem(this.lsUserKey, userData);
  }

  public isAuthenticated(){
    return this.hasLogged || this.checkAuthInStorage();
  }

  private checkAuthInStorage(){
    if(this.lsService.getItem(this.lsUserKey))
      return true;
    return false;
  }

  public checkSession(){
    // console.debug('defOptions', this.defOptions);
    // return this.http.get(this.baseUrl+'login/session',  this.defOptions);
    return this.http2.get(this.baseUrl+'login/session');
  }

  public refreshUserFromServer(userId: number){
    // let options = JSON.parse(JSON.stringify(this.defOptions));
    let options = {
      params: {
        userId: String(userId)
      }
    };

    this.hasRefreshed = true;
    /*return this.http.get(this.baseUrl+'login',  options)
      .map(res => res.json());*/

    return this.http2.get(this.baseUrl+'login',  options);
  }

  // FOR ADMIN USER ONLY
  public getAllUsers(){
    /*return this.http.get(this.baseUrl+'admin/users', this.defOptions)
      .map(response => response.json());*/

    return this.http2.get(this.baseUrl+'admin/users');
  }

  public resetPassword(userName: string) {
    // let options = this.defOptions;
    /*options.*/let params = {
      userName: userName
    }
    /*return this.http.get(this.baseUrl+'login/reset', options)
      .map(res => res.json());*/

    return this.http.get(this.baseUrl+'login/reset', {params: params});
  }
}
