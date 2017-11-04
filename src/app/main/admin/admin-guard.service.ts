import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DataStorageService } from '../../services/data-storage.service';

@Injectable()
export class AdminGuardService implements  CanActivate{

  constructor(private dsService: DataStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(`Attempt to activate ${state.url} route`);
    return this.dsService.isUserAdmin();
  }

}
