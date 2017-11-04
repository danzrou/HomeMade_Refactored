import { AgmCoreModule, LazyMapsAPILoader, MapsAPILoader } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { SharedModule } from '../shared/shared-module.module';
import { AdminGuardService } from './admin/admin-guard.service';
import { AdminModule } from './admin/admin.module';
import { DishesModule } from './dishes/dishes.module';
import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from './main.component';
import { OrdersModule } from './orders/orders.module';
import { ProfileModule } from './profile/profile.module';
import { RecipeModule } from "./recipe-book/recipe-module.module";
import { MainSharedModule } from './shared/main-shared.module';
import { MainHomeModule } from './home/main-home.module';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    FormsModule,
    SharedModule,
    MainSharedModule,
    OrdersModule,
    DishesModule,
    RecipeModule,
    ProfileModule,
    AdminModule,
    MainHomeModule
  ],
  providers: [
    {provide: MapsAPILoader, useClass: LazyMapsAPILoader},
    AdminGuardService
  ]
})
export class MainModule { }
