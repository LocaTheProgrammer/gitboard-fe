import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  endpoint: string = environment.apiURL + "/todolist/rest/company/";

  constructor(private httpClient: HttpClient) { }


  createCompany() {
    return this.httpClient.get<any>(`${this.endpoint}createCompany`)
  }

}
