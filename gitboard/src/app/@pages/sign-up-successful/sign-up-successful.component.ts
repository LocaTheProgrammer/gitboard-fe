import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-sign-up-successful',
  templateUrl: './sign-up-successful.component.html',
  styleUrls: ['./sign-up-successful.component.scss']
})
export class SignUpSuccessfulComponent implements OnInit {

  
  token:string=""

  constructor(private router: Router, private aRoute: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.aRoute.queryParams
      .subscribe(params => {
        this.token = params['token'];
        this.userService.confirmAccount(this.token).subscribe()
      }
    );
  }

  goToLogin(){
    this.router.navigateByUrl('login')
  }

}
