import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '../@models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint:string="http://localhost:8090/todolist/rest/task/";


  constructor(private HttpClient: HttpClient) { }


  getUserTaskListByUserEmail(email:string){
    return this.HttpClient.post<any>(`${this.endpoint+'getUserTaskList'}`, {email})
  }

  getDynamicUserTaskList(email:string){
    return this.HttpClient.post<any>(`${this.endpoint+'getDynamicUserTaskList'}`, {email})
  }

  updateTaskList(task:Task){
    return this.HttpClient.put<any>(`${this.endpoint+'updateTaskList'}`, task)
  }
}
