import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {Dish} from '../dishes/dish.model';
import {DataStorageService} from '../../services/data-storage.service';
import {ActivatedRoute} from '@angular/router';
import {DishService} from '../shared/services/dish.service';
import {BlockUI, NgBlockUI} from 'ng-block-ui';
import { IMyDateModel, IMyDpOptions } from 'mydatepicker';
import { GMapsService } from '../shared/services/gmaps.service';
import { GenericModalComponent } from '../shared/generic-modal/generic-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './make-order.component.html',
  styleUrls: ['./make-order.component.css', '../../auth/login/login.component.css']
})
export class MakeOrderComponent implements OnInit {

  dish: Dish;
  dishId: number;
  order: any;
  paypalApproval: any;

  canOrder: boolean;

  debug = false;

  cordBuyer =  {
    lat: 0,
    lng: 0
  };

  cordSeller = {
    lat: 0,
    lng: 0,
  };

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy/mm/dd',
    editableDateField: false,
    satHighlight: true,
    sunHighlight: false,
    firstDayOfWeek: 'su',
    maxYear: 2018,
    disableSince: {year: 2018, month: 2, day: 1},
    disableUntil: {year: new Date().getFullYear(), month: new Date().getMonth()+1, day: new Date().getDate()-1},
    height: '36px'
  };

  public pickupDate: any;

  @BlockUI() blockUi: NgBlockUI;

  @ViewChild('errorModal') errorModal: GenericModalComponent;

  constructor(private dsService: DataStorageService,
              private route: ActivatedRoute,
              private dishService: DishService,
              private gmapsService: GMapsService,
              private _zone: NgZone) { }


  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        this.dishId = +params['dishId'];
        console.debug('params id=', this.dishId);
        this.dish = this.dsService.getFeedDishById(this.dishId);
        if(!this.dish){
          this.dishService.getDishById(this.dishId).subscribe(
            dish => {
              if(dish) {
                this.dish = dish[0];
                this.initOrder(this.dish);
              }
              else
                console.error(`No dish with id=${this.dishId}`);
            },
            error => {
              console.error(`Error retrieving dish with id=${this.dishId}`);
            }
          );
        }
        else{
          this.initOrder(this.dish);
        }
      }
    )
  }

  getOrderAmounts(){
    let amounts = new Array();
    for(var i=1; i<=this.order.dish.avlAmount; i++){
      amounts.push(i);
    }

    return amounts;
  }

  resolveAddress(user, cord){
    let userFullAddress = `${user.address} ${user.houseNum}, ${user.city}`;
    console.debug('user add', userFullAddress);

    this.gmapsService.getLatLan(userFullAddress)
      .subscribe(
        result => {
          // needs to run inside zone to update the map
          this._zone.run(() => {
            console.debug('Geocode result=', result);
            cord.lat = result.lat();
            cord.lng = result.lng();
          });
        },
        error => console.log(error),
        () => console.log('Geocoding completed!')
      );
  }

  private initOrder(dish: Dish){
    this.order = {
      dish: this.dish,
      sellerId: this.dish.seller.id,
      buyerId: this.dsService.getUserId(),
      buyer: this.dsService.getCurrentUser(),
      amount: 1
    };

    this.order.totalPrice = this.dish.price*this.order.amount;
    this.canOrder = this.order.sellerId != this.order.buyerId;

    this.resolveAddress(this.order.buyer, this.cordBuyer);
    this.resolveAddress(this.order.dish.seller, this.cordSeller);
  }

  onDateChanged(event: IMyDateModel){
    this.order.pickupDate = event.jsdate;
  }

  onAmountChanged(event){
    let amount = event.target.value;
    this.order.totalPrice = this.dish.price*amount;
  }

  paymentFinished(ppApproval: Event) {
    console.debug('Order payment finished', ppApproval);
    this.blockUi.stop();
    this.paypalApproval = ppApproval;
  }

  paymentProcessing(event: Event) {
    console.debug('paypal processing...');
    this.blockUi.start('Processing Payment...');
  }

  errorTxt: string;
  paymentExecuteError(event: Event){
    this.blockUi.stop();
    this.errorTxt = 'Something went wrong when trying to process the order.';
    this.errorModal.show();
  }
}
