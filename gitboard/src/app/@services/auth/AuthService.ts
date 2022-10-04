import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';
@Injectable()
export class AuthService {

  public isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false
  }

  getDecodedAccessToken(): any {

    let token = null
    if (localStorage.getItem('token') != null) {
      token = localStorage.getItem('token') + ''
      console.log(jwt_decode(token));
    }

    return token
  }
}