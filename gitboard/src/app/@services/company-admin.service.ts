import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CompanyAdminNameDTO } from '../@models/CompanyAdminNameDTO';
@Injectable({
  providedIn: 'root'
})
export class CompanyAdminService {

  endpoint: string = environment.apiURL + "/todolist/rest/company/admin/";

  constructor(private httpClient: HttpClient) { }


  createCompanyAdmin(adminName:CompanyAdminNameDTO) {
    return this.httpClient.post<any>(`${this.endpoint}createCompanyAdmin`, {adminName})
  }

  findAllAvailableAdmin(){
    return this.httpClient.get<any>(`${this.endpoint}findAllFreeAdmins`)
  }

}
