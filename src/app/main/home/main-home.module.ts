import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainSharedModule } from '../shared/main-shared.module';
import { DishSearchComponent } from './dish-search/dish-search.component';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { MainHomeComponent } from './main-home.component';
import { UserProfileComponent } from './user-side-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    MainSharedModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    MainHomeComponent,
    UserProfileComponent,
    FeedCardComponent,
    DishSearchComponent
  ],
  exports: [
    MainHomeComponent,
    UserProfileComponent,
    FeedCardComponent
  ]
})
export class MainHomeModule { }
