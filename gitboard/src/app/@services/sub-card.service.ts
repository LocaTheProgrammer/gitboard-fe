import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Task } from 'src/app/@models/DTO/Task';

@Injectable({
  providedIn: 'root'
})
export class SubCardService {

  endpoint: string = environment.apiURL + "/todolist/rest/task/subcard/";

  constructor(private httpClient: HttpClient) { }

  getByTaskListId(taskListId: string) {
    return this.httpClient.get<any>(`${this.endpoint}getSubCards`, { params: { id: taskListId } })
  }

  updateTaskList(task: Task) {
    return this.httpClient.put<any>(`${this.endpoint}updateTaskList`, task)
  }


}
