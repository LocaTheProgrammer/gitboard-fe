import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  name!:string
  surname!:string
  email!:string
  password!:string
  isPasswordVisible=false;

  constructor() { }

  ngOnInit(): void {
  }


  isUserSubmittable(){
    return this.name!=undefined&&this.surname!=undefined&&this.email!=undefined&&this.password!=undefined
  }

  showPassword(){this.isPasswordVisible=!this.isPasswordVisible}


  save(){

  }
}
