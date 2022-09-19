import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/@services/task.service';
import { Task } from 'src/app/@models/Task';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  
  todo : string [] = [];

  inProgress : string [] = [];

  done : string [] = [];

  taskList : Task [] = [];

  constructor(private taskService:TaskService){}
  
  ngOnInit() {
    let email= localStorage.getItem('email')+''
    this.taskService.getUserTaskListByUserEmail(email).subscribe((response:any)=>{
      this.taskList=response.body
      console.log(this.taskList)
      this.loadArrays()
    })
  }

  
  drop(event:any) { // CdkDragDrop<string[]>
    console.log(event)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  loadArrays(){
    for(let task of this.taskList){
      switch(task.listName){
        case 'todo':
          this.todo.push(task.taskName)
          break;
        case 'progress':
            this.inProgress.push(task.taskName)
        break;
        case 'done':
          this.done.push(task.taskName)
          break;
      }
    }
  }

}
