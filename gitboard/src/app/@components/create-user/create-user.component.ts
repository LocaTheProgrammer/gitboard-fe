import { Component, OnInit } from '@angular/core';
import { UserDTO } from 'src/app/@models/DTO/UserDTO';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  name: string = ''
  surname: string = ''
  email: string = ''
  password: string = ''
  isPasswordVisible = false;

  message: string = ''
  alertType: string = ''
  isUserSaved: boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }


  isUserSubmittable() {
    return !(this.name != '' && this.surname != '' && this.email != '' && this.password != '')
  }

  showPassword() { this.isPasswordVisible = !this.isPasswordVisible }


  save() {
    this.isUserSaved = false;
    let user: UserDTO = new UserDTO(this.name, this.surname, this.email, this.password)

    this.userService.createAccountUser(user).subscribe(() => {
      this.message = 'ok'
      this.alertType = "success"
    },
      () => {
        this.message = 'no ok'
        this.alertType = "danger"
      }, () => this.isUserSaved = true)

  }
}
