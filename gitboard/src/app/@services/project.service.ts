import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BasicUserDTO } from '../@models/DTO/BasicUserDTO';
import { CompanyDTO } from '../@models/DTO/CompanyDTO';
import { ProjectDTO } from '../@models/DTO/ProjectDTO';
import { ProjectUserDTO } from '../@models/DTO/ProjectUserDTO';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  endpoint: string = environment.apiURL + "/todolist/rest/project/";


  constructor(private httpClient: HttpClient) { }


  create(project: ProjectDTO) {
    return this.httpClient.post<any>(`${this.endpoint}create`, project)
  }

  findAll() {
    return this.httpClient.get<any>(`${this.endpoint}findAll`)
  }

  getAllByCompany(company: CompanyDTO) {
    return this.httpClient.post<any>(`${this.endpoint}getAllByCompany`, company)
  }


  addUserToProject(puDTO: ProjectUserDTO) {
    return this.httpClient.post<any>(`${this.endpoint}addUserToProject`, puDTO)
  }

  findByUser(user: BasicUserDTO) {
    return this.httpClient.post<any>(`${this.endpoint}findByUser`, user)
  }

  deleteProject(project: ProjectDTO) {
    return this.httpClient.delete<any>(`${this.endpoint}deleteProject`, { body: project })
  }

}
