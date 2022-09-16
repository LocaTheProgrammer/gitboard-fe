import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../@services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  successMessage=0;//0 base 1 successo 2 errore

  constructor(private fb: FormBuilder,
    private userService: UserService) { }


  ngOnChanges(): void {
    this.checkEmailAndPassword()
  }


  isPasswordVisible=false;
  userSignupForm!:FormGroup;


  mailNotMatching:boolean=false
  passwordNotMatching:boolean=false

  picker:any
  date!: {year: number, month: number};

  ngOnInit(): void {
    this.userSignupForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      mail: ['', Validators.required],
      password: ['', Validators.required],
      mailRepeat: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
    })
  }


  showPassword(){
    this.isPasswordVisible=!this.isPasswordVisible;
  }

  signup(){
    this.userService.createAccount(this.userSignupForm.value.name, this.userSignupForm.value.surname,this.userSignupForm.value.mail, this.userSignupForm.value.password).subscribe(ret =>{
      if(ret.statusCode === 200){
        this.successMessage=1;
      }else{
        this.successMessage=2;
      }
    })
  }

  checkEmailAndPassword(){

    this.mailNotMatching=false;
    this.passwordNotMatching=false;

    if(this.userSignupForm.value.mail != this.userSignupForm.value.mailRepeat){
      this.mailNotMatching=true;
      return false;
    }

    if(this.userSignupForm.value.password != this.userSignupForm.value.passwordRepeat){
      this.passwordNotMatching=true;
      return false;
    }

    return true;
  }
}
