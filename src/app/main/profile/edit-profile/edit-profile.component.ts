import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../../services/data-storage.service';
import { AttachmentService } from '../../shared/services/attachment.service';
import {AuthService} from "../../../auth/auth.service";
import {RegistrationUser} from "../../../auth/register/register.component";
import { cities } from "../../../auth/register/register.component"
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { User } from '../user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private dsService: DataStorageService,
              public attService: AttachmentService,
              private authService: AuthService) {
  }

  user: User;
  regUser: RegistrationUser;
  updateSuccess: boolean = false;
  updateFailed: boolean = false;

  cities = cities;
  @BlockUI() blockUi: NgBlockUI;

  ngOnInit() {
    this.user = this.dsService.getCurrentUser();
    this.regUser = JSON.parse(JSON.stringify(this.dsService.getCurrentUser()));
  }

  onProfileUpload(resp) {
    console.debug('onProfilEUpload', resp);
    this.user.profileImg = resp.message;
    this.dsService.updateUserInContext(this.user);
  }

  onUpdate(){
    this.blockUi.start('Updating Profile...');
    setTimeout(() => this.authService.updateUser(this.regUser).subscribe(
      (updated: RegistrationUser) => {
        console.debug('updated user', updated);
        delete updated.password;
        this.dsService.updateUserInContext(updated);
        this.blockUi.stop();
        this.updateSuccess = true;
      },
      error => {
        console.error('Error in profile update', error);
        this.blockUi.stop();
        this.updateFailed = true;
      }
    ), 1500);
  }
}
