import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  public addItem(key: string, value: any){
    let objJSON = JSON.stringify(value);
    localStorage.setItem(key, objJSON);
  }

  public getItem(key: string): any{
    let objJSON = localStorage.getItem(key);
    let objParsed = JSON.parse(objJSON);
    return objParsed;
  }

  public clear(){
    localStorage.clear();
  }

  public removeItem(key: string){
    localStorage.removeItem(key);
  }
}
