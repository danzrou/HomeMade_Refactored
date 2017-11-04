import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ProfileComponent } from './profile.component';

const PROFLIE_ROUTES: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'pub/:id', component: ProfileComponent },
  { path: 'edit', component: EditProfileComponent}

];

@NgModule({
  imports: [RouterModule.forChild(PROFLIE_ROUTES)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
