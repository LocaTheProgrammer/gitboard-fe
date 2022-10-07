import { Component, OnInit } from '@angular/core';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { UserDTO } from 'src/app/@models/DTO/UserDTO';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { MessageService } from 'src/app/@services/message.service';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
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
    this.userService.findUserByEmail(userEmail).subscribe((userFound: BasicUserDTO) => {
      if (userFound.firstName)
        this.name = userFound.firstName
      if (userFound.lastName)
        this.surname = userFound.lastName
    })
  }

  save() {
    // private String firstName;
    // private String lastName;
    // private String email;
    // private String password;
    let update = {
      firstName: this.name,
      lastName: this.surname,
      email: this.email,
      password: this.password
    }
    // let update: UserDTO = new UserDTO(this.name, this.surname, this.email, this.password)
    this.userService.updateUserInfo(update).subscribe(
      () => {
        this.sendMessage('ok')
        this.setType('success')
      },
      () => {
        this.sendMessage('not ok')
        this.setType('danger')
      },
      () => {
        setTimeout(() => {
          this.clearMessages()
          this.clearTypes()
        }, 3 * 1000);
      }
    )
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

}
