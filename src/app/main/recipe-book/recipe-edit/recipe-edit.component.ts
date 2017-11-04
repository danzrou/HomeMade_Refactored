import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { DataStorageService } from '../../../services/data-storage.service';
import { Dish } from "../../dishes/dish.model";
import { RecipeService } from '../../shared/services/recipe.service';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'main-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  @Input() dish: Dish;
  @Input() recipe: Recipe;

  @Input() isNew: boolean;

  measureTypes: string[] = [
    'tsp',
    'tbsp',
    'cup',
    'ml',
    'l',
    'pound',
    'ounce',
    'mg',
    'g',
    'kg',
    'unit'
  ];

  uploadSuccess: boolean = false;
  uploadFailed: boolean = false;

  noDishSpecified: boolean = false;

  @BlockUI() blockUi: NgBlockUI;

  constructor(private route: ActivatedRoute,
              private dsService: DataStorageService,
              private recipeService: RecipeService,
              private _location: Location) { }


  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if(params['id']){
          let dishId = params['id'];
          console.debug('dishId=', dishId);
          this.dish = this.dsService.getUserDishById(dishId);
          if(!this.dish) {
            this.noDishSpecified = true;
            return;
          }

          this.isNew = this.dish.recipeId <= 0;
          console.debug('isNew2', this.isNew);

          this.isNew ? this.initRecipe() : this.recipe = this.dish.recipe;

          let path = this._location.path();
          this._location.replaceState(path.substring(path.indexOf('/main'), path.indexOf('/edit')));
          // console.log(this._location.path());
        }
        else{
          this.noDishSpecified = true;
        }
      }
    )

  }

  initRecipe(){
    // console.log('initRecipe called');
    this.recipe = {
      avgCookTime : '',
      servings : 0,
      ingredients : [
        {name: '', measure: ''}
      ],
      directions : [
        {description: '', step: 1}
      ]
    }
  }

  onSubmit(){
    this.blockUi.start('Loading dish recipe...');
    this.isNew ? this.createRecipe() : this.updateRecipe();
  }

  createRecipe(){
    this.recipeService.createRecipe(this.recipe, this.dish.id).subscribe(
      recipe => {
        console.log('recipe created successfuly', recipe);
        this.handleSuccess();
      },
      error => {
        console.error('could not create recipe', error);
        this.blockUi.stop();
      }
    );
  }

  updateRecipe(){
    this.recipeService.updateRecipe(this.recipe, this.dish.id).subscribe(
      recipe => {
        console.log('recipe updated successfuly', recipe);
        this.handleSuccess();
      },
      error => {
        console.error('could not updated recipe', error);
        this.blockUi.stop();
      }
    );
  }

  handleSuccess(){
    this.blockUi.stop();
    this.uploadSuccess = true;
    this.dish.recipe = this.recipe;
    this.dish.recipeId = this.recipe.id;

    this.dsService.updateUserDish(this.dish);
  }

  addIngredient(){
    this.recipe.ingredients.push({name: '', measure: '' });
  }

  removeIngredient(i: number){
    this.recipe.ingredients.splice(i,  1);
  }

  addDirection(){
    let lastStep = this.recipe.directions[this.recipe.directions.length - 1].step;
    this.recipe.directions.push({description: '', step: lastStep + 1})
  }

  removeDirection(i: number){
    this.recipe.directions.splice(i,1);
    this.recalculateSteps();
  }

  recalculateSteps(){
    let firstStep = 1;
    this.recipe.directions.forEach(
      direction => {
        direction.step = firstStep++;
      }
    );
  }
}
