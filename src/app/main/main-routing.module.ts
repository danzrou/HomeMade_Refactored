import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from './admin/admin-guard.service';
import { AdminComponent } from './admin/admin.component';
import { MainHomeComponent } from './home/main-home.component';
import { MainComponent } from './main.component';
import { DishComponent } from './dishes/dish-modal/dish-modal.component';
import { MakeOrderComponent } from './orders/make-order.component';
import { UserOrdersComponent } from './orders/user-orders/user-orders.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { UploadDishComponent } from './dishes/upload-dish/upload-dish.component';
import { UserDishesComponent } from './dishes/user-dishes/user-dishes.component';
import { DishEditFormComponent } from './dishes/dish-edit-form/dish-edit-form.component';
import { RecipeEditComponent } from './recipe-book/recipe-edit/recipe-edit.component';
import { DishSearchComponent } from './home/dish-search/dish-search.component';

const mainRoutes: Routes = [
  {  path: '', component: MainComponent, children: [
    { path: 'home', component: MainHomeComponent , children: [
      { path: ':id', component: DishComponent, outlet: 'modal' }
    ]},
/*
    { path: 'recipebook', component: RecipeBookComponent },
    { path: 'recipebook/edit/:id', component: RecipeEditComponent },
    */
    { path: 'recipebook', loadChildren: 'app/main/recipe-book/recipe-module.module#RecipeModule' },

    // { path: 'edit-profile', component: EditProfileComponent },
    // { path: 'profile', component: ProfileComponent},
    // { path: 'profile/:id', component: ProfileComponent},

    { path: 'profile', loadChildren: 'app/main/profile/profile.module#ProfileModule' },

    // { path: 'admin', component: AdminComponent, canActivate: [AdminGuardService]},
    { path: 'admin', loadChildren: 'app/main/admin/admin.module#AdminModule' , },

    { path: 'dish', component: DishComponent },
    { path: 'sell', component: UploadDishComponent },
    { path: 'mydishes', component: UserDishesComponent },
    { path: 'mydishes/:id', component: DishEditFormComponent },

    { path: 'order', component: MakeOrderComponent },
    { path: 'myorders', component: UserOrdersComponent },

    { path: 'search', component: DishSearchComponent }

  ] }
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
