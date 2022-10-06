import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompanyDTO } from '../@models/DTO/CompanyDTO';
import { ProjectUserDTO } from '../@models/DTO/ProjectUserDTO';
import { UserDTO } from '../@models/DTO/UserDTO';
import { UserAuth } from '../@models/DTO/UserAuth';
import { BasicUserDTO } from '../@models/DTO/BasicUserDTO';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = environment.apiURL + "/todolist/";

  constructor(private httpClient: HttpClient) { }

  getBearerToken(username: any, password: any): Observable<any> {
    return this.httpClient.post<any>(`${this.endpoint}rest/auth/authenticate`, { username, password })
  }

  confirmAccount(token: string) {
    return this.httpClient.get<any>(`${this.endpoint}rest/user/confirm-account`, { params: { token: token } })
  }

  forgotPassword(email: string) {
    return this.httpClient.post<any>(`${this.endpoint}rest/user/forgot-password`, { email })
  }

  confirmResetPasswordToken(token: string) {
    return this.httpClient.get<any>(`${this.endpoint}rest/user/confirm-reset`, { params: { token: token } })
  }

  resetPassword(email: string, password: string) {
    return this.httpClient.post<any>(`${this.endpoint}rest/user/reset-password`, { email, password })
  }

  createAccount(name: string, surname: string, email: string, password: string) {
    let url = this.endpoint.concat('rest/user/create')
    return this.httpClient.post<any>(url, { name, surname, email, password })
  }

  createAccountUser(user: UserDTO) {
    let url = this.endpoint.concat('rest/user/create')
    return this.httpClient.post<any>(url, user)
  }

  findAllBasic() {
    return this.httpClient.get<any>(`${this.endpoint}rest/user/findAllBasic`)
  }

  getAllByCompany(company: CompanyDTO) {
    return this.httpClient.post<any>(`${this.endpoint}rest/user/getAllByCompany`, company)
  }

  getIdAndPermissionByEmail(email: string) {
    return this.httpClient.post<any>(`${this.endpoint}rest/user/getIdAndPermissionByEmail`, { email })
  }

  findAuths() {
    return this.httpClient.get<any>(`${this.endpoint}rest/user/findAuths`)
  }

  updateUserAuth(userAuth: UserAuth) {
    return this.httpClient.put<any>(`${this.endpoint}rest/user/updateAuthority`, userAuth)
  }

  findUserByEmail(email: BasicUserDTO) {
    return this.httpClient.post<any>(`${this.endpoint}rest/user/findUserByEmail`, email)
  }

  updateUserInfo(updateUser: BasicUserDTO) {
    return this.httpClient.put<any>(`${this.endpoint}rest/user/updateUser`, updateUser)
  }

}
