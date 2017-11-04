///<reference path="../../../../node_modules/@angular/router/src/router_module.d.ts"/>
import { RouterModule, Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { NgModule } from '@angular/core';

const RECIPE_ROUTES: Routes = [
  { path: '', component: RecipeBookComponent },
  { path: 'edit/:id', component: RecipeEditComponent }

];

@NgModule({
  imports: [RouterModule.forChild(RECIPE_ROUTES)],
  exports: [RouterModule]
})
export class RecipeRoutes {}
