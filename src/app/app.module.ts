import { AgmCoreModule } from "@agm/core";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import {
  AuthGuard,
  AuthService,
  GoogleButtonComponent,
  LoginComponent,
  RegisterComponent,
  ResetPasswordComponent
} from './auth';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DataStorageService, GenericServerService, LocalStorageService, UsersService } from './services';
import { NotFoundComponent, SharedModule } from './shared';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NoopInterceptor } from '@angular/common/http/src/interceptor';
import { HttpInterceptor } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    GoogleButtonComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BlockUIModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJbw4dmV8rgTrxai1D_ysPR48rtCBLfls'
    }),
  ],
  providers: [
    AuthService,
    AuthGuard,
    DataStorageService,
    LocalStorageService,
    GenericServerService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
