import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  endpoint: string = environment.apiURL + "/todolist/rest/authority";

  constructor(private http: HttpClient) { }

  getAuthname(authName: string) {
    return this.http.get<any>(`${this.endpoint}/getAuthByName`, { params: { authName: authName } })
  }


}
