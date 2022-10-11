import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/@services/message.service';
import { UserService } from '../../@services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterContentChecked {

  successMessage = 0;//0 base 1 successo 2 errore
  incorrectMail: boolean = true;
  isLoading: boolean = false;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private messageService: MessageService) { }

  ngAfterContentChecked(): void {
    this.checkEmail()
    this.checkPassword()
    this.isMailIncorrect()
  }


  isPasswordVisible = false;
  userSignupForm!: FormGroup;


  mailNotMatching: boolean = false
  passwordNotMatching: boolean = false

  picker: any
  date!: { year: number, month: number };

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


  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  signup() {
    this.isLoading = true;
    this.userService.createAccount(this.userSignupForm.value.name, this.userSignupForm.value.surname, this.userSignupForm.value.mail, this.userSignupForm.value.password).subscribe({
      next: () => {
        this.sendMessage("accont created")
        this.setType("successful")
      },
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessageAndType()
    })
  }


  checkEmail() {
    this.mailNotMatching = false;
    if (this.userSignupForm.value.mail != this.userSignupForm.value.mailRepeat) {
      this.mailNotMatching = true;
      return false;
    }
    return true;
  }

  checkPassword() {
    this.passwordNotMatching = false;

    if (this.userSignupForm.value.mail != this.userSignupForm.value.mailRepeat) {
      this.mailNotMatching = true;
      return false;
    }

    if (this.userSignupForm.value.password != this.userSignupForm.value.passwordRepeat) {
      this.passwordNotMatching = true;
      return false;
    }

    return true;
  }

  checkEmailAndPassword() {

    if (this.checkEmail() && this.checkPassword()) {
      return true;
    }
    return false;
  }

  isMailIncorrect() {
    this.incorrectMail = false;
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    this.incorrectMail = regex.test(this.userSignupForm.value.mail);
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
