import { Injectable, Optional } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Headers, Http, RequestOptionsArgs } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class GenericServerService {

  protected baseUrl: string = 'http://localhost:8080/';
  protected readonly appUrl: string = 'HomeMadeApi/api/';
  protected readonly token: string = 'QXZpdkFuZERhbkhvbWVNYWRlUHJvamVjdA==';
  protected readonly headerKey: string = 'homemade-api';

  constructor(/*protected lsService: LocalStorageService*/) {
    this.baseUrl = environment.apiBaseUrl+this.appUrl;
  }

  protected headers = new Headers({
    [this.headerKey]: this.token
  });

  /*protected defOptions: RequestOptionsArgs = {
    headers: this.headers,
    withCredentials: true
  };*/



  /*protected copyOptions(){
    return JSON.parse(JSON.stringify(this.defOptions));
  }*/

}
