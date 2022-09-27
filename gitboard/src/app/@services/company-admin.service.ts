import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CompanyAdminNameDTO } from '../@models/DTO/CompanyAdminNameDTO';
import { CompanyDTO } from '../@models/DTO/CompanyDTO';

@Injectable({
  providedIn: 'root'
})
export class CompanyAdminService {

  endpoint: string = environment.apiURL + "/todolist/rest/company/admin/";

  constructor(private httpClient: HttpClient) { }
  
  getAllCompanyAdmins(company: CompanyDTO) {
    return this.httpClient.post<any>(`${this.endpoint}findAllByCompany`, company)
  }

  createCompanyAdmin(adminName:CompanyAdminNameDTO) {
    return this.httpClient.post<any>(`${this.endpoint}createCompanyAdmin`, adminName)
  }

  findAllAvailableAdmin(){
    return this.httpClient.get<any>(`${this.endpoint}findAllFreeAdmins`)
  }

  getAllAdminsNotInCompany(companySelected: CompanyDTO) {
    return this.httpClient.post<any>(`${this.endpoint}findAllNotInCompany`, companySelected)
    
  }

}
