import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {Order} from "../../order.model";
import { OrdersService } from '../../../shared/services/orders.service';
import { GenericModalComponent } from '../../../shared/generic-modal/generic-modal.component';
import { RecipeService } from '../../../shared/services/recipe.service';

@Component({
  selector: 'orders-single-user-order',
  templateUrl: './single-user-order.component.html',
  styleUrls: ['./single-user-order.component.css']
})
export class SingleUserOrderComponent implements OnInit {

  @Input() order: Order;
  showContent: boolean = false;
  disableRating: boolean = false;

  @ViewChild('modal') modal: GenericModalComponent;
  modalMsg: string;

  constructor(private orderService: OrdersService, private recipeService: RecipeService) { }

  ngOnInit() {
    if(this.order.rating)
      this.disableRating = true;
    else
      this.disableRating = false;
  }


  onOrderRated(event){
    let rating = event.rating;
    console.log('rating='+rating);
    this.order.rating = rating;
    this.disableRating = true;
    this.orderService.rateOrder(this.order).subscribe(
      response => {
        console.log(response.message);
      },
      error => {
        console.log('could not rate order');
      }
    );
  }

  addToRecipeBook(recipeId){
    this.recipeService.addToRecipeBookById(recipeId).subscribe(
      response => {
        this.modalMsg = 'The recipe was added to your recipe book successfully!'
        this.modal.show();
      },
      error => {
        let errorBody;
        try{
          errorBody = error.json();
        } catch(e) {

        }
        this.modalMsg = errorBody.message ? errorBody.message : 'Something went wrong. Please try again.';
        this.modal.show();
        console.error('error adding recipe to recipbook', recipeId);
      }
    );
  }
}
