import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CompanyAdminService {

  endpoint: string = environment.apiURL + "/todolist/rest/company/admin/";

  constructor(private httpClient: HttpClient) { }


  createCompanyAdmin() {
    return this.httpClient.get<any>(`${this.endpoint}createCompanyAdmin`)
  }

}
