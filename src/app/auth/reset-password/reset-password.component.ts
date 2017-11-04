import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../login/login.component.css']
})
export class ResetPasswordComponent implements OnInit {

  userName: string;
  errorMsg: string;
  resetSuccess: boolean = false;
  resetFail: boolean = true;

  @BlockUI() blockUi: NgBlockUI;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.blockUi.start('Resetting your password...');
    this.authService.resetPassword(this.userName)
      .subscribe(
        response => {
          this.errorMsg = null;
          this.resetSuccess = true;
          this.blockUi.stop();
        },
        error => {
          try{
            let errorBody = error.json();
            this.errorMsg = errorBody.message ? errorBody.message : 'Something went wrong. Please try again.';
          }
          catch(e) {
            console.warn('Could not parse the error. Probably a server deployment error');
            this.errorMsg = 'Something went wrong. Please try again.';
          }
          this.blockUi.stop();
        }
      )
  }
}
