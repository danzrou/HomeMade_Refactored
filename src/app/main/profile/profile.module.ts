import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainSharedModule } from '../shared/main-shared.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../../shared/shared-module.module';
import { ProfileRoutingModule } from './profile-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainSharedModule,
    SharedModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent,
    EditProfileComponent
  ],
  exports: [
    ProfileComponent,
    EditProfileComponent
  ]
})
export class ProfileModule { }
