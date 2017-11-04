import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { GenericServerService } from '../../../services/generic.service';

@Injectable()
export class PaypalService extends GenericServerService{

  private resourceUrl: string = 'orders';

  constructor(private http: HttpClient,
              private router: Router) {
    super();
  }

  public getPayPalPaymentId(data): Promise<any>{
    /*let headers = new Headers({
      [this.headerKey]: this.token
    });

    let options: RequestOptionsArgs = {
      method: 'POST',
      headers: headers
    };*/

    /*return this.http.post(this.baseUrl+this.resourceUrl+'/payment',  data, options)
      .map(response => response.json())
      .toPromise();*/

    return this.http.post(this.baseUrl+this.resourceUrl+'/payment',  data)
      .toPromise();
  }

  public executePayPalPayment(paymentId: string, payerId: string){
    /*let headers = new Headers({
      [this.headerKey]: this.token
    });

    let options: RequestOptionsArgs = {
      method: 'GET',
      headers: headers,
      params: {
        PaymentId: paymentId,
        PayerId: payerId
      }
    };*/

    let params = {
      PaymentId: paymentId,
        PayerId: payerId
    }

    /*return this.http.get(this.baseUrl+this.resourceUrl+'/payment/execute', options)
      .map(response => response.json());*/

    return this.http.get(this.baseUrl+this.resourceUrl+'/payment/execute', {params: params});
  }

}
