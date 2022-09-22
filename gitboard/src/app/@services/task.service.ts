import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../@models/Task';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint:string=environment.apiURL+"/todolist/rest/task/";


  constructor(private httpClient: HttpClient) { }


  getUserTaskListByUserEmail(email:string){
    return this.httpClient.post<any>(`${this.endpoint+'getUserTaskList'}`, {email})
  }

  getDynamicUserTaskList(email:string){
    return this.httpClient.post<any>(`${this.endpoint+'getDynamicUserTaskList'}`, {email})
  }

  updateTaskList(task:Task){
    return this.httpClient.put<any>(`${this.endpoint+'updateTaskList'}`, task)
  }
}
