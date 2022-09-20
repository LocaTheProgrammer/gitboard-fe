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
  email:string=''
  isLoading:boolean=false;

  containerName:string=''
  containerCounter:number=0
  isFirstShifting=true;

  updateError:boolean=false

  constructor(private taskService:TaskService){}
  
  ngOnInit() {
    this.email = localStorage.getItem('email')+''
    this.getUserTaskListByUserEmail();
  }

  getUserTaskListByUserEmail(){
    this.taskService.getUserTaskListByUserEmail(this.email).subscribe((response:any)=>{
      this.taskList=response
      this.loadArrays()
    })
  }
  
  drop(event:any) { // CdkDragDrop<string[]>
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
    this.updateTaskList(event)
  }

  loadArrays(){
    this.todo = [];
      this.inProgress = [];
      this.done = [];
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
    if(!this.isFirstShifting){
      this.containerCounter=this.containerCounter+3
    }
    this.isLoading=false
  }

  //TODO: cdk-drop-list-0
  //IN PROGRESS: cdk-drop-list-1
  //DONE: cdk-drop-list-2

  updateTaskList(event:any){
    this.isLoading=true;
    let task: Task;
    let listName='';
    let taskName='';
    let taskPosition:number;
    let taskId:any;
    let taskListId:any;
    
    taskPosition=event.currentIndex

    this.containerName=event.container.id
    let containerNumber=this.containerName.substring(this.containerName.lastIndexOf("-")+1, this.containerName.length)
    let switchCondition=+containerNumber-this.containerCounter

    switch(switchCondition){
      case 0:
        listName='todo'
        taskName=this.todo[event.currentIndex]
      break;
      case 1:
        listName='progress'
        taskName=this.inProgress[event.currentIndex]
      break;
      case 2:
        listName='done'
        taskName=this.done[event.currentIndex]
      break;
      default:
        this.updateError=true
    }
    
    
    taskId=this.taskList.find(task => (task.taskName == taskName))?.taskId
    taskListId=this.taskList.find(task => task.taskId==taskId)?.taskListId
    
    
    task=new Task(listName, taskName, taskPosition, taskId, taskListId)

    this.taskService.updateTaskList(task).subscribe(()=>{
      this.updateError=false
      this.isFirstShifting=false
      this.taskList = [];
      this.getUserTaskListByUserEmail()
    },()=>{
      this.updateError=true
    this.isLoading=false

    })

  }



}
