import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Dish} from "../../dishes/dish.model";
import { RecipeService } from '../../shared/services/recipe.service';
import { DataStorageService } from '../../../services/data-storage.service';

@Component({
  selector: 'main-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css', '../../orders/user-orders/single-user-order/single-user-order.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  @Input() dish: Dish;
  @Input() recipe: Recipe;

  showContent: boolean = false;

  constructor(private recipeService: RecipeService,
              private dsService: DataStorageService) { }

  ngOnInit() {

  }

  deleteFromRecipeBook(recipe, modal){
    this.recipeService.deleteFromRecipeBook(recipe).subscribe(
      response => {
        console.debug('recipe removed succesfully');
        this.recipeService.reloadRecipeBook('Reloading Recipe Book...');
        modal.hide();
      },
      error => {
        let errorBody;
        try{
          errorBody = error.json();
        } catch(e) {

        }
        modal.hide();
        console.error('error adding recipe to recipbook', recipe);
      }
    );
  }
}
