import { Injectable } from '@angular/core';
import { GenericServerService } from '../../../services/generic.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Http } from '@angular/http';
import { Order } from '../../orders/order.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrdersService extends GenericServerService {

  constructor(private http: HttpClient) {
    super();
  }

  public getUserOrders(userId: number){
    // let options = JSON.parse(JSON.stringify(this.defOptions));
    /*options.*/let params = {
      userId: String(userId)
    }
    /*return this.http.get(this.baseUrl+'orders', options)
      .map(response => response.json());*/

    return this.http.get(this.baseUrl+'orders', {params: params});
  }

  public rateOrder(order: Order){
    /*return this.http.post(this.baseUrl+'orders/rating', order, this.defOptions)
      .map(res => res.json());*/

    return this.http.post<any>(this.baseUrl+'orders/rating', order);
  }

}
