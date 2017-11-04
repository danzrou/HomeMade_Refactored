import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeModule } from "../recipe-book/recipe-module.module";
import { MainSharedModule } from '../shared/main-shared.module';
import { DishEditFormComponent } from './dish-edit-form/dish-edit-form.component';
import { DishComponent } from './dish-modal/dish-modal.component';
import { UploadDishComponent } from './upload-dish/upload-dish.component';
import { UserDishesComponent } from './user-dishes/user-dishes.component';

@NgModule({
  imports: [
    CommonModule,
    MainSharedModule,
    FormsModule,
    RouterModule,
    RecipeModule
  ],
  declarations: [
    UploadDishComponent,
    DishComponent,
    UploadDishComponent,
    UserDishesComponent,
    DishEditFormComponent
  ],
  exports: [
    UploadDishComponent,
    DishComponent,
    UploadDishComponent,
    UserDishesComponent
  ]
})
export class DishesModule { }
