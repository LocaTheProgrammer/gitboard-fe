import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  endpoint:string="http://localhost:8090/todolist/rest/task/";


  constructor(private HttpClient: HttpClient) { }


  getUserTaskListByUserEmail(email:string){
    return this.HttpClient.post<any>(`${this.endpoint+'getUserTaskList'}`, {email})
  }
}
