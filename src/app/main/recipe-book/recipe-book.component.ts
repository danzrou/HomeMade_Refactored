import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Subscription } from 'rxjs/Subscription';
import { DataStorageService } from '../../services/data-storage.service';
import { Dish } from '../dishes/dish.model';
import { RecipeService } from '../shared/services/recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {

  dishes: Dish[];
  @BlockUI() blockUi: NgBlockUI;
  reloadSubscription: Subscription;

  constructor(private dsService: DataStorageService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.reloadSubscription = this.recipeService.recipeBookReload.subscribe(
      msg => {
        this.blockUi.start(msg);
        this.reloadRecipes();
      }
    )
    this.blockUi.start('Loading your Recipe Book...');
    this.reloadRecipes();
  }

  reloadRecipes(){
    let userId = this.dsService.getUserId();
    this.recipeService.getRecipeBook(userId).subscribe(
      dishes => {
        console.debug('Got recipe book dishes', dishes);
        this.dishes = dishes;
        this.blockUi.stop();
      },
      error => {
        console.error('Error getting recipe book', error);
        this.blockUi.stop();
      }
    )
  }

  ngOnDestroy(){
    this.reloadSubscription.unsubscribe();
  }
}
