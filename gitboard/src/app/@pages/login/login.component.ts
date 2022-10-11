import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/@services/message.service';
import { UserService } from '../../@services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService) { }

  isPasswordVisible = false;
  loginError = false;

  userLoginForm!: FormGroup;

  ngOnInit(): void {

    if (localStorage.getItem('token')) {
      this.router.navigateByUrl('projects')
    }

    this.userLoginForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login() {
    this.userService.getBearerToken(this.userLoginForm.value.mail, this.userLoginForm.value.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.loginError = false;
          localStorage.setItem('token', response.token)
          this.router.navigateByUrl("/projects")
        }
      },
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessageAndType()
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
