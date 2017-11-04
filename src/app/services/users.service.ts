import { Injectable } from '@angular/core';
import { GenericServerService } from './generic.service';
import { LocalStorageService } from './local-storage.service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { User } from '../main/profile/user.model';

@Injectable()
export class UsersService extends GenericServerService{

  constructor(private http: HttpClient) {
    super();
  }

  public getUserbyId(userId: number){
    // let options = this.defOptions;
    /*options.*/let params = {
      id: String(userId)
    };

    /*return this.http.get(this.baseUrl+'users', options)
      .map(response => response.json());*/

    return this.http.get<User>(this.baseUrl+'users', {params: params});
  }

}
