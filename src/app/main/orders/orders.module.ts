import { AgmCoreModule } from "@agm/core";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BlockUIModule } from 'ng-block-ui';
import { SharedModule } from '../../shared/shared-module.module';
import { MainSharedModule } from '../shared/main-shared.module';
import { MakeOrderComponent } from './make-order.component';
import { SingleUserOrderComponent } from './user-orders/single-user-order/single-user-order.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainSharedModule,
    FormsModule,
    AgmCoreModule,
    BlockUIModule
  ],
  declarations: [
    MakeOrderComponent,
    UserOrdersComponent,
    SingleUserOrderComponent
  ]
})
export class OrdersModule { }
