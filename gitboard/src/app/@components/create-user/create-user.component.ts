import { Component } from '@angular/core';
import { UserDTO } from 'src/app/@models/DTO/UserDTO';
import { MessageService } from 'src/app/@services/message.service';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class CreateUserComponent {

  name: string = ''
  surname: string = ''
  email: string = ''
  password: string = ''
  isPasswordVisible = false;

  message: string = ''
  alertType: string = ''
  isUserSaved: boolean = false;

  constructor(private userService: UserService, private messageService: MessageService) { }


  isUserSubmittable() {
    return !(this.name != '' && this.surname != '' && this.email != '' && this.password != '')
  }

  showPassword() { this.isPasswordVisible = !this.isPasswordVisible }


  save() {
    this.isUserSaved = false;
    let user: UserDTO = new UserDTO(this.name, this.surname, this.email, this.password)

    this.userService.createAccountUser(user).subscribe({
      next: () => {
        this.messageService.sendMessage("user created")
        this.messageService.sendType("success")
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })

  }


}
