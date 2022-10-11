import { Component, OnInit } from '@angular/core';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { UserMailPassword } from 'src/app/@models/DTO/UserMailPassword';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { MessageService } from 'src/app/@services/message.service';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
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

  constructor(private userService: UserService, private authService: AuthService, private messageService: MessageService) { }

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
        this.sendMessage('add ok')
        this.setType('success')
      },
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessages()
    })

  }

  sendErrorMessage() {
    this.sendMessage("something went wrong")
    this.setType("danger")
  }

  clearMessageAndType() {
    setTimeout(() => {
      this.clearMessages()
      this.clearTypes()
    }, 3 * 1000);
  }

  sendMessage(message: string): void {
    this.messageService.sendMessage(message);
  }

  setType(type: string) {
    this.messageService.sendType(type)
  }


  clearMessages(): void {
    this.messageService.clearMessages();
  }

  clearTypes() {
    this.messageService.clearType()
  }


}
