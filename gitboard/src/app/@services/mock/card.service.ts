import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDTO } from 'src/app/@models/DTO/CategoryDTO';
import { ProjectUserDTO } from 'src/app/@models/DTO/ProjectUserDTO';
import { Task } from 'src/app/@models/DTO/Task';
import { TaskList } from 'src/app/@models/DTO/TaskList';
import { TaskClone } from 'src/app/@models/mock/TaskClone';
import { TaskModelMock } from 'src/app/@models/mock/TaskModelMock';

@Injectable({
  providedIn: 'root'
})
export class CardService {


  private categoryUrl = 'api/taskListCategory/'
  private taskListUrl = 'api/taskList/'
  private taskUrl = 'api/task/'
  
  constructor(private http: HttpClient) { }

  getDynamicUserTaskList() {
    return this.http.get<Task[]>(this.taskListUrl)
  }

  getCategories(){
    return this.http.get<CategoryDTO[]>(this.categoryUrl)
  }

  getTaskList(){
    return this.http.get<TaskClone[]>(this.taskUrl)
  }

  getAllTask(){
    return this.http.get<TaskModelMock[]>(this.taskUrl)
  }

  addTask(task:TaskModelMock){
    return this.http.post<any>(this.taskUrl, task)
  }

  deleteCard(task: TaskModelMock) {
    return this.http.delete<any>(this.taskUrl + task.id) 
  }
  
}
