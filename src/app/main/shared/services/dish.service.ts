import { Injectable } from '@angular/core';
import { DataStorageService } from '../../../services/data-storage.service';
import { Dish } from '../../dishes/dish.model';
import { Http } from '@angular/http';
import { GenericServerService } from '../../../services/generic.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DishService extends GenericServerService {

  // private appUrl: string = 'HomeMade/api'
  private resourceUrl: string = 'dish';
  public searchDishSubject = new Subject<any>();

  constructor(/*private http: Http,*/
              private http: HttpClient) {
    super();
  }

  getFeedDishes(): Observable<Dish[]> {
    /*return this.http.get(this.baseUrl+this.resourceUrl+'/feed', this.defOptions)
      .map(response => response.json());*/

    return this.http.get<Dish[]>(this.baseUrl+this.resourceUrl+'/feed');
  }

  getUserDishes (userId: number): Observable<Dish[]>{
    // let options = JSON.parse(JSON.stringify(this.defOptions));
    let params = {
      userId: String(userId)
    };

    /*return this.http.get(this.baseUrl+this.resourceUrl, options)
      .map(res => res.json());*/

    return this.http.get<Dish[]>(this.baseUrl+this.resourceUrl, {params: params});
  }

  getDishById(dishId: number): Observable<Dish> {
    // let options = JSON.parse(JSON.stringify(this.defOptions));
    /*options.*/let params = {
      id: String(dishId)
    };

    /*return this.http.get(this.baseUrl+this.resourceUrl, options)
      .map(resp => resp.json()[0]);*/

    return this.http.get<Dish>(this.baseUrl+this.resourceUrl, {params: params})
      .map(resp => resp[0]);
  }

  uploadDish(formData: FormData){
    /*return this.http.post(this.baseUrl+this.resourceUrl+'/upload', formData, this.defOptions)
      .map(res => res.json());*/

    return this.http.post<Dish>(this.baseUrl+this.resourceUrl+'/upload', formData);
  }

  updateDish(formData: FormData){
    /*return this.http.post(this.baseUrl+this.resourceUrl+'/update', formData, this.defOptions)
      .map(res => res.json());*/

    return this.http.post<Dish>(this.baseUrl+this.resourceUrl+'/update', formData);
  }

  updateDishStatus(dish: Dish, status: number) {
    // let options = JSON.parse(JSON.stringify(this.defOptions));
    /*options.*/let params = {
      status: String(status)
    };

    return this.http.post(this.baseUrl+this.resourceUrl+'/updateStatus', dish, {params: params});
  }

  searchDishes(searchParams: any): Observable<Dish[]>{
    // let options = this.copyOptions();
    let options;
    options.params = JSON.parse(JSON.stringify(searchParams));


    if(options.params.kosher)
      options.params.kosher = 1;
    else
      delete options.params.kosher;

    options.params.status = 1;
    /*return this.http.get(this.baseUrl+this.resourceUrl, options)
      .map(res => res.json());*/

    return this.http.get<Dish[]>(this.baseUrl+this.resourceUrl, {params: options.params});
  }

  pushSearchParams(searchParams: any){
    console.debug('IN pushSearchParams', searchParams);
    let checkedParams = this.checkParams(searchParams);
    console.debug('OUT pushSearchParams', checkedParams);
    this.searchDishSubject.next(checkedParams);
  }

  checkParams(searchParams){
    if(!searchParams || (!searchParams.nameLike && !searchParams.ingrdLike && !searchParams.kosher)) return null;
    Object.keys(searchParams).forEach(key => {
      if(!searchParams[key] || searchParams[key].length < 1) delete searchParams[key];
    });

    return searchParams;
  }
}
