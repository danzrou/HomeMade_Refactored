import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Dish } from '../main/dishes/dish.model';
import { User, UserContext } from '../main/profile/user.model';

@Injectable()
export class DataStorageService {

  private userContext: UserContext;
  private feedDishes: Array<Dish>;

  private readonly lclUserCtx = 'userCtx';
  private readonly lclFeedDishes = 'feedDishes';

  constructor(private lsService: LocalStorageService) {
  }

  storeUserContext(userContext){
    this.userContext = userContext;
    this.lsService.addItem(this.lclUserCtx, userContext);
  }

  updateUserContext(userContext){
    this.userContext = userContext;
    this.lsService.addItem(this.lclUserCtx, userContext);
  }

  updateUserDishes(userDishes: Array<Dish>) {
    this.userContext.dishes = userDishes;
    this.lsService.addItem(this.lclUserCtx, this.userContext);
  }

  updateUserDish(dish: Dish) {
    this.checkUserContext();
    this.userContext.dishes.forEach((userDish, i) => {
      if(dish.id == userDish.id)
        this.userContext.dishes[i] = dish;
    });
  }

  addUserDish(dish: Dish){
    this.checkUserContext();
    this.userContext.dishes.push(dish);
  }

  updateUserInContext(user){
    this.userContext.user = user;
    this.lsService.addItem(this.lclUserCtx, this.userContext);
  }

  getCurrentUser(): User{
    this.checkUserContext();
    return this.userContext.user;
  }

  getCurrentUserOrders(){
    this.checkUserContext();
    return this.userContext.orders;
  }

  getCurrentUserDishes(){
    this.checkUserContext();
    return this.userContext.dishes;
  }

  getUserDishById(dishId: number) : Dish{
    this.checkUserContext();
    let dish = null;

    dish = this.userContext.dishes.filter(dish => {return dish.id == dishId})[0];

    return dish;
  }

  isUserSeller() : boolean {
    this.checkUserContext();
    return this.userContext.user.producer;
  }

  getUserId() : number {
    this.checkUserContext();
    return this.userContext.user.id;
  }

  isUserAdmin() : boolean{
    this.checkUserContext();
    return this.userContext.user.id <= 10;
  }

  storeFeedDishes(feedDishes: Dish[]): void {
    this.feedDishes = feedDishes;
    this.lsService.addItem(this.lclFeedDishes, feedDishes);
  }

  getFeedDishes() : Dish[] {
    this.checkFeedDishes();
    return this.feedDishes;
  }

  getFeedDishById(dishId: number) : Dish {
    this.checkFeedDishes();
    let dish = null;
    if(this.feedDishes)
      dish = this.feedDishes.filter(dish => { return dish.id == dishId })[0];

    return dish;
  }

  private checkUserContext(){
    if(!this.userContext){
      this.userContext = this.lsService.getItem(this.lclUserCtx);
    }
  }

  private checkFeedDishes(){
    if(!this.feedDishes)
      this.feedDishes = this.lsService.getItem(this.lclFeedDishes);
  }


}
