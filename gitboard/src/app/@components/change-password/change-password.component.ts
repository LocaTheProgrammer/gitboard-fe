import { Component, OnInit } from '@angular/core';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { UserMailPassword } from 'src/app/@models/DTO/UserMailPassword';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { MessageService } from 'src/app/@services/message.service';
import { UserService } from 'src/app/@services/user.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  oldPassword: string = ''
  newPassword: string = ''
  repeatPassword: string = ''

  isOldPasswordVisible: boolean = false
  isNewPasswordVisible: boolean = false
  isRepeatPasswordVisible: boolean = false

  email: string = ''

  strRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  constructor(private userService: UserService, private authService: AuthService, private ms: MessageService) { }

  ngOnInit(): void {
    this.email = this.authService.getEmailFromToken()
  }

  changeOPVisibility() {
    this.isOldPasswordVisible = !this.isOldPasswordVisible
  }

  changeNPVisibility() {
    this.isNewPasswordVisible = !this.isNewPasswordVisible
  }

  changeRPVisibility() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible
  }

  isFormSubmittable() {
    return this.strRegex.test(this.repeatPassword) && this.strRegex.test(this.newPassword) && this.newPassword == this.repeatPassword && this.email != '' && this.oldPassword != ''
  }


  save() {
    let userPassword: UserMailPassword = new UserMailPassword(this.email, this.repeatPassword, this.oldPassword)

    this.userService.updatePassword(userPassword).subscribe({
      next: () => {
        this.ms.sendMessage('add ok')
        this.ms.sendType('success')
      },
      error: () => this.ms.sendErrorMessage(),
      complete: () => this.ms.clearMessageAndType()
    })

  }



}
