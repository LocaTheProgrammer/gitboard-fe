import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../@services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router:Router) { }

  isPasswordVisible=false;
  loginError=false;

  userLoginForm!: FormGroup;

  ngOnInit(): void {

    if(localStorage.getItem('token')){
      this.router.navigateByUrl('projects')
    }

    this.userLoginForm = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  showPassword(){
    this.isPasswordVisible=!this.isPasswordVisible;
  }

  login(){
    this.userService.getBearerToken(this.userLoginForm.value.mail, this.userLoginForm.value.password).subscribe(response=>{
      if(response.token){
        this.loginError=false;
        localStorage.setItem('token', response.token)
        localStorage.setItem('email',this.userLoginForm.value.mail)
        this.router.navigateByUrl("/projects")
      } 
    }, () =>{
        this.loginError=true;
    })
  }

}
