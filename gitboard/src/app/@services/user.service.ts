import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint:string="http://localhost:8090/todolist/";


  constructor(private httpClient: HttpClient) { }


  getBearerToken(username: any, password: any): Observable<any> {
    return this.httpClient.post<any>(`${this.endpoint+'authenticate'}`, { username, password })
  }

  confirmAccount(token:string){
    return this.httpClient.get<any>(`${this.endpoint}rest/user/confirm-account`, {params: {token: token}})
  }

  forgotPassword(email:string){
    return this.httpClient.post<any>(`${this.endpoint}rest/user/forgot-password`, {email})
  }

  confirmResetPasswordToken(token:string){
    return this.httpClient.get<any>(`${this.endpoint}rest/user/confirm-reset`, {params: {token: token}})
  }

  resetPassword(email:string, password:string){
    return this.httpClient.post<any>(`${this.endpoint}rest/user/reset-password`, { email, password })

  }

  createAccount(name:string, surname:string, email:string, password:string){
    let url=this.endpoint.concat('rest/user/create')
    return this.httpClient.post<any>(url, {name, surname, email, password})
  }
}
