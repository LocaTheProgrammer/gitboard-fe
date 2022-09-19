import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './AuthService';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate() : any{
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
    }else{
      return true
    }
  }
}