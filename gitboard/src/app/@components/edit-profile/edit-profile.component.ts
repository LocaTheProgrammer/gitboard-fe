import { Component, OnInit } from '@angular/core';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { UserDTO } from 'src/app/@models/DTO/UserDTO';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { MessageService } from 'src/app/@services/message.service';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class EditProfileComponent implements OnInit {

  email!: string

  name!: string
  surname!: string
  password: string = ''
  isPasswordVisible: boolean = false
  constructor(private authService: AuthService, private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.email = this.authService.getEmailFromToken()
    this.loadUserInfo()
  }


  loadUserInfo() {
    let userEmail = new BasicUserDTO(this.email)

    this.userService.findUserByEmail(userEmail).subscribe({
      next: (userFound: BasicUserDTO) => {
        if (userFound.firstName)
          this.name = userFound.firstName
        if (userFound.lastName)
          this.surname = userFound.lastName
      },
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessageAndType()
    })

  }

  save() {
    let update = {
      firstName: this.name,
      lastName: this.surname,
      email: this.email,
      password: this.password
    }

    this.userService.updateUserInfo(update).subscribe({
      next: () => {
        this.sendMessage('user updated')
        this.setType('success')
      },
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessageAndType()
    })

  }

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible
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


}
