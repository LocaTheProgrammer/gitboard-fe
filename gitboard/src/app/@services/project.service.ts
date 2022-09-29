import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CompanyDTO } from '../@models/DTO/CompanyDTO';
import { ProjectDTO } from '../@models/DTO/ProjectDTO';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
 
  endpoint:string=environment.apiURL+"/todolist/rest/project/";


  constructor(private httpClient: HttpClient) { }


  create(project: ProjectDTO) {
    return this.httpClient.post<any>(`${this.endpoint}create`, project)
  }

  findAll(){
    return this.httpClient.get<any>(`${this.endpoint}findAll`)
  }

  getAllByCompany(company: CompanyDTO){
    return this.httpClient.post<any>(`${this.endpoint}getAllByCompany`, company)
  }

}
