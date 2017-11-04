import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { MyDatePickerModule } from 'mydatepicker';
import { SharedModule } from '../../shared/shared-module.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HeaderComponent } from '../header/header.component';
import { PayPalButtonComponent } from './paypal-button/pay-pal-test.component';
import { AttachmentService } from './services/attachment.service';
import { DishService } from './services/dish.service';
import { GMapsService } from './services/gmaps.service';
import { OrdersService } from './services/orders.service';
import { PaypalService } from "./services/paypal-service.service";
import { BlockUIModule } from 'ng-block-ui';
import { AgmCoreModule } from "@agm/core";
import { RecipeService } from './services/recipe.service';
import { GenericModalComponent } from './generic-modal/generic-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    MyDatePickerModule,
    StarRatingModule.forRoot(),
    BlockUIModule,
    AgmCoreModule
  ],
  declarations: [
    PayPalButtonComponent,
    FileUploadComponent,
    GenericModalComponent
  ],
  exports: [
    PayPalButtonComponent,
    FileUploadComponent,
    GenericModalComponent,
    MyDatePickerModule,
    StarRatingModule,
    BlockUIModule,
    AgmCoreModule
  ],
  providers: [
    AttachmentService,
    DishService,
    GMapsService,
    OrdersService,
    PaypalService,
    RecipeService
  ]
})
export class MainSharedModule { }
