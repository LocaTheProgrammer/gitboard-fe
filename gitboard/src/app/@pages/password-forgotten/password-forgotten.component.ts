import { Component, OnInit } from '@angular/core';
import { UserService } from '../../@services/user.service';

@Component({
  selector: 'app-password-forgotten',
  templateUrl: './password-forgotten.component.html',
  styleUrls: ['./password-forgotten.component.scss']
})
export class PasswordForgottenComponent{

  email:string="";
  isMessageSent=0;

  constructor(private userService:UserService) {}

  resetPassword(){
    this.userService.forgotPassword(this.email).subscribe((response)=>{
      if(response.status === 200){
        this.isMessageSent=1
      }else{
          this.isMessageSent=2
      }
      
    },
    )
  }

}
