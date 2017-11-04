import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainSharedModule } from '../shared/main-shared.module';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeRoutes } from './recipe-routing.module';

@NgModule({
  imports: [
    RecipeRoutes,
    CommonModule,
    FormsModule,
    RouterModule,
    MainSharedModule
  ],
  declarations: [
    RecipeEditComponent,
    RecipeBookComponent,
    RecipeDetailsComponent
  ],
  exports: [
    RecipeEditComponent,
    RecipeBookComponent,
    RecipeDetailsComponent
  ]
})
export class RecipeModule { }
