import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TaskListProject } from '../@models/DTO/TaskistProject';
import { TaskDTO } from '../@models/DTO/TaskDTO';
import { ProjectUserDTO } from '../@models/DTO/ProjectUserDTO';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  endpoint:string=environment.apiURL+"/todolist/rest/task/";


  constructor(private httpClient: HttpClient) { }

  create(task:TaskDTO){
    return this.httpClient.post<any>(`${this.endpoint}create`, task)
  }


  getUserTaskListByUserEmail(email:string){
    return this.httpClient.post<any>(`${this.endpoint}getUserTaskList`, {email})
  }

  getDynamicUserTaskList(pu:ProjectUserDTO){
    return this.httpClient.post<any>(`${this.endpoint}getDynamicUserTaskList`, pu)
  }

  updateTaskList(task:Task){
    return this.httpClient.put<any>(`${this.endpoint}updateTaskList`, task)
  }

  findAllTaskList() {
    return this.httpClient.get<any>(`${this.endpoint}findAllTaskList`)
  }

  findAllTask(){
    return this.httpClient.get<any>(`${this.endpoint}findAllTask`)
  }

  createTaskList(taskList:TaskListProject){
    return this.httpClient.post<any>(`${this.endpoint}createTaskList`, taskList)
  }
}
