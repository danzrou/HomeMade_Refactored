import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(`Attempt to activate ${state.url} route`);
    return this.authService.isAuthenticated();
  }

  canLoad(route: Route) {
    console.log(`Attempt to activate /${route.path} route`);
    if(!this.authService.isAuthenticated())
      this.router.navigate(['/login']);
    return this.authService.isAuthenticated();
  }
}
