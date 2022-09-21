import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@services/user.service';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent {

  email: string = "";
  isMessageSent = 0;
  isLoading: boolean = false
  errorMessage:string=""

  constructor(private userService: UserService) { }

  resetPassword() {
    this.isLoading = true
    this.userService.forgotPassword(this.email).subscribe((response) => {
      if (response.status === 200) {
        this.isMessageSent = 1
        this.isLoading = false
      }
    }, (error) => {
      this.errorMessage=error.error.message
      this.isMessageSent = 2
      this.isLoading = false
    },
    )
  }

}
