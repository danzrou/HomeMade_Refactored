import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DataStorageService } from "../../services/data-storage.service";
import { DishService } from '../shared/services/dish.service';
import { User, UserContext } from '../profile/user.model';
import {Dish} from "../dishes/dish.model";
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css']
})
export class MainHomeComponent implements OnInit, OnDestroy {

  /* User Data */
  currUser: User;
  currUserOrders;
  feedItems: Array<Dish>;

  @BlockUI() blockUi: NgBlockUI;

  private searchSubscription: Subscription;


  constructor(
    private dsService: DataStorageService,
    private dishService: DishService,
    private authService: AuthService) { }

  ngOnInit() {
    this.searchSubscription = this.dishService.searchDishSubject.subscribe(
      searchParams => {
        if(!searchParams) {
          this.refreshFeed();
        }
        else {
          this.blockUi.start('FEEDING...');
          this.searchDishes(searchParams);
        }
      }
    );
    this.currUser = this.dsService.getCurrentUser();
    this.currUserOrders = this.dsService.getCurrentUserOrders();
    this.feedItems = this.dsService.getFeedDishes();

    this.refreshFeed();
  }

  searchDishes(searchParams){
    this.dishService.searchDishes(searchParams).subscribe(
      dishes => {
        this.feedItems = dishes;
        // console.debug('dishes', dishes);
        this.blockUi.stop();
      },
      error => {
        this.blockUi.stop();
      }
    );
  }

  refreshFeed(){
    this.blockUi.start('FEEDING...');
    console.log('Refreshing feed...');
    this.dishService.getFeedDishes().subscribe(
      dishes => {
        // console.debug('Got dishes', dishes);
        this.feedItems = dishes;
        this.dsService.storeFeedDishes(dishes);
        this.blockUi.stop();
      },
      error => {
        console.error('Error in getting feed dishes');
        // this.feedItems = this.dishService.feedDishes;
        this.blockUi.stop();
        throw new Error(error);
      }
    )
  }

  ngOnDestroy(){
    this.searchSubscription.unsubscribe();
  }

}
