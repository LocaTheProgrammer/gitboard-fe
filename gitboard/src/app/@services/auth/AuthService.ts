import { Injectable } from "@angular/core";
import jwt_decode from 'jwt-decode';
@Injectable()
export class AuthService {

  public isAuthenticated(): boolean {
    return localStorage.getItem('token') ? true : false
  }

  public getAuthFromToken() {
    let token = this.getDecodedAccessToken()
    return token.auths[0].authority
  }

  public getEmailFromToken() {
    let token = this.getDecodedAccessToken()
    return token.sub
  }

  private getDecodedAccessToken(): any {
    let token = null
    if (localStorage.getItem('token') != null) {
      token = localStorage.getItem('token')
      token = jwt_decode(token + '')
    }
    return token
  }
}