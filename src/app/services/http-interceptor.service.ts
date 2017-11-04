import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptor implements HttpInterceptor {

  protected readonly token: string = 'QXZpdkFuZERhbkhvbWVNYWRlUHJvamVjdA==';
  protected readonly headerKey: string = 'homemade-api';

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //const authHeader = this.headerKey;
    const authReq = req.clone({setHeaders: { [this.headerKey]: this.token}});

    return next.handle(authReq);
  }
}
