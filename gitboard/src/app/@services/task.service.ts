import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../@models/Task';
import { environment } from 'src/environments/environment';
import { TaskDTO } from './TaskDTO';
import { TaskListProject } from '../@models/TaskistProject';

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

  getDynamicUserTaskList(email:string){
    return this.httpClient.post<any>(`${this.endpoint}getDynamicUserTaskList`, {email})
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
