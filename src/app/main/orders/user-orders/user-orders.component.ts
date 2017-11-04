import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../services/data-storage.service';
import { Order } from '../order.model';
import { OrdersService } from '../../shared/services/orders.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'main-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  userOrders: Array<Order>;
  @BlockUI() blockUi: NgBlockUI;

  constructor(private dsService: DataStorageService,
              private orderService: OrdersService) { }

  ngOnInit() {
    this.blockUi.start('Loading order history...');
    // this.userOrders = this.dsService.getCurrentUserOrders();
    if(!this.userOrders){
      let curUserId = this.dsService.getUserId();
      this.orderService.getUserOrders(curUserId).subscribe(
        (orders: Array<Order>) => {
          console.debug('orders', orders);
          this.userOrders = orders;
          this.blockUi.stop();
        },
        error => {
          console.error('Error loading user orders', error);
          this.userOrders = this.dsService.getCurrentUserOrders();
          this.blockUi.stop();
        }
      );
    }
    else{
      this.blockUi.stop();
    }
  }

}
