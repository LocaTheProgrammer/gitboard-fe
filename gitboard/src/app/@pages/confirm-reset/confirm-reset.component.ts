import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-confirm-reset',
  templateUrl: './confirm-reset.component.html',
  styleUrls: ['./confirm-reset.component.scss']
})
export class ConfirmResetComponent implements OnInit {
  isPasswordVisible: boolean=false;
  passwordNotMatching:boolean=false

  password:string=""
  passwordRepeat:string=""
  token: any;
  email:string=""

  isPasswordReset:number=0
  
  constructor(private aRoute: ActivatedRoute, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.aRoute.queryParams
      .subscribe(params => {
        this.token = params['token'];
        this.email = params['email'];
        this.userService.confirmResetPasswordToken(this.token).subscribe()
      }
    );
  }


  showPassword(){
    this.isPasswordVisible=!this.isPasswordVisible;
  }

  changeForgottenPassword(){
    console.log(this.email)
    this.userService.resetPassword(this.email, this.password).subscribe(()=>{
      this.isPasswordReset=1
    },
    ()=>{
      this.isPasswordReset=2
    })
  }

  goToLogin(){
    this.router.navigateByUrl('login')
  }

}