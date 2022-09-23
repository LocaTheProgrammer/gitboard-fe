import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompanyDTO } from '../@models/CompanyDTO';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  endpoint: string = environment.apiURL + "/todolist/rest/company/";

  constructor(private httpClient: HttpClient) { }


  createCompany(company: CompanyDTO) {
    console.log(company)
    return this.httpClient.post<any>(`${this.endpoint}createCompany`, company)
  }

}
