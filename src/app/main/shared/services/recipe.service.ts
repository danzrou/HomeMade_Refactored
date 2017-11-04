import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataStorageService } from '../../../services/data-storage.service';
import { GenericServerService } from '../../../services/generic.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { Recipe } from '../../recipe-book/recipe.model';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipeService extends GenericServerService{

  private resourceUrl: string = 'recipe';
  public recipeBookReload = new Subject<string>();

  constructor(private http: HttpClient,
              private dsService: DataStorageService) {
    super();

  }

  reloadRecipeBook(msg: string){
    this.recipeBookReload.next(msg);
  }

  updateRecipe(recipe: Recipe, dishId: number){
    // let options = this.copyOptions();
    /*options.*/let params = {
      dishId: String(dishId)
    };

    /*return this.http.post(this.baseUrl+this.resourceUrl+'/update', recipe, options)
      .map(res => res.json());*/

    return this.http.post(this.baseUrl+this.resourceUrl+'/update', recipe, {params: params});
  }

  createRecipe(recipe: Recipe, dishId: number){
    // let options = this.copyOptions();
    /*options.*/let params = {
      dishId: String(dishId)
    };

    /*return this.http.post(this.baseUrl+this.resourceUrl+'/create', recipe, options)
      .map(res => res.json());*/

    return this.http.post(this.baseUrl+this.resourceUrl+'/create', recipe, {params: params});
  }

  getRecipeBook(userId: number) {
    // let options = this.copyOptions();
    /*options.*/let params = {
      userId: String(userId)
    };

    /*return this.http.get(this.baseUrl+this.resourceUrl+'/recipebook', options)
      .map(res => res.json());*/

    return this.http.get(this.baseUrl+this.resourceUrl+'/recipebook', {params: params});
  }

  addToRecipeBook(recipe: Recipe){
    return this.callRecipeBook(recipe.id, 'add');
  }

  deleteFromRecipeBook(recipe: Recipe){
    return this.callRecipeBook(recipe.id, 'delete');
  }

  addToRecipeBookById(recipeId: number){
    return this.callRecipeBook(recipeId, 'add');
  }

  private callRecipeBook(recipeId: number, action: string){
    let postBody = {
      userId: this.dsService.getUserId(),
      recipeId: recipeId
    };

    // let options = this.copyOptions();
    /*options.*/let params = {
      action: action
    };

    // console.debug('options', options);
    // return this.http.post(this.baseUrl+this.resourceUrl+'/recipebook', postBody, options);
    return this.http.post(this.baseUrl+this.resourceUrl+'/recipebook', postBody, {params: params});
  }


}
