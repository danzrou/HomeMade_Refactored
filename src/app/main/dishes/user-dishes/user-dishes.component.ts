import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../services/data-storage.service';
import { Dish } from '../dish.model';
import { DishService } from '../../shared/services/dish.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dishes-user-dishes',
  templateUrl: './user-dishes.component.html',
  styleUrls: ['./user-dishes.component.css', '../../orders/user-orders/single-user-order/single-user-order.component.css']
})
export class UserDishesComponent implements OnInit {

  constructor(private dsService: DataStorageService,
              private dishService: DishService,
              private router: Router) { }

  userDishes: Array<Dish>;
  shownDishes: Array<Dish>;

  dishToEdit: Dish;
  showEdit: boolean = false;

  showEditRecipe: boolean = false;

  uploadSuccess: boolean = false;
  uploadFailed: boolean = false;

  ngOnInit() {
    this.userDishes = this.dsService.getCurrentUserDishes();
    this.shownDishes = JSON.parse(JSON.stringify(this.userDishes));
    // console.debug('userDishes', this.userDishes);
    // console.debug('shownDi', this.shownDishes);
  }

  editDish(dish: Dish){
    this.shownDishes = [dish];
    this.showEdit = true;
    this.dishToEdit = dish;

    this.uploadSuccess = this.uploadFailed = false;
  }

  finishEdit(){
    this.shownDishes = JSON.parse(JSON.stringify(this.userDishes));
    this.showEdit = false;
    this.showEditRecipe = false;
  }

  onDishUpdated(dish: Dish){
    console.debug('dish id', dish.id);
    this.uploadSuccess = true;
    this.userDishes.forEach( (userDish, index) => {
      if(dish.id === userDish.id)
        this.userDishes[index] = dish;
    });
    this.dsService.updateUserDishes(this.userDishes);
    /*this.dishService.getUserDishes(this.dsService.getUserId()).subscribe(
      (dishes: Dish[]) => {
        this.userDishes = dishes;
      }
    );*/
  }

  onUpdateFailed(error){
    this.uploadFailed = true;
  }

  onDishFormSubmit(formData: any){

  }
}
