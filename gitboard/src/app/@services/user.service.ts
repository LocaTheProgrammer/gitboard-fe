import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  auth:string="http://localhost:8090/todolist/";


  constructor(private HttpClient: HttpClient) { }


  getBearerToken(username: any, password: any): Observable<any> {
    return this.HttpClient.post<any>(`${this.auth+'authenticate'}`, { username, password })
  }

  confirmAccount(token:string){
    return this.HttpClient.get<any>(`${this.auth+'rest/user/confirm-account?token='+token}`)
  }

  forgotPassword(email:string){
    return this.HttpClient.post<any>(`${this.auth+'rest/user/forgot-password'}`, {email})
  }

  confirmResetPasswordToken(token:string){
    return this.HttpClient.get<any>(`${this.auth+'rest/user/confirm-reset?token='+token}`)
  }

  resetPassword(email:string, password:string){
    return this.HttpClient.post<any>(`${this.auth+'rest/user/reset-password'}`, { email, password })

  }

  createAccount(name:string, surname:string, email:string, password:string){
    let url=this.auth.concat('rest/user/create')
    console.log({name, surname, email, password})
    return this.HttpClient.post<any>(url, {name, surname, email, password})
  }
}
