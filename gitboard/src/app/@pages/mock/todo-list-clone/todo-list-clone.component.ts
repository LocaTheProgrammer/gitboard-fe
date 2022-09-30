import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryDTO } from 'src/app/@models/DTO/CategoryDTO';
import { ProjectUserDTO } from 'src/app/@models/DTO/ProjectUserDTO';
import { Task } from 'src/app/@models/DTO/Task';
import { TaskList } from 'src/app/@models/DTO/TaskList';
import { Card } from 'src/app/@models/mock/Card';
import { CategoryService } from 'src/app/@services/category.service';
import { CardService } from 'src/app/@services/mock/card.service';
import { TaskService } from 'src/app/@services/task.service';

@Component({
  selector: 'app-todo-list-clone',
  templateUrl: './todo-list-clone.component.html',
  styleUrls: ['./todo-list-clone.component.scss']
})
export class TodoListCloneComponent implements OnInit {

  todo: string[] = [];
  inProgress: string[] = [];
  done: string[] = [];
  taskList: Task[] = [];
  email: string = ''
  isLoading: boolean = false;

  containerName: string = ''
  containerCounter: number = 0
  isFirstShifting = true;

  updateError: boolean = false

  id!: number
  isIdValid = true
  inputTaskList!: TaskList[]
  inputCategoryList!: CategoryDTO[]
  message: string = '';


  //mock purpose properties
  cardList: Card[] = []
  taskListMock: Task[] = []

  constructor(
    private taskService: TaskService,
    private _Activatedroute: ActivatedRoute,
    private cardService: CardService
  ) { }

  ngOnInit() {
    this.initialize()
  }

  initialize() {
  
      this.email = localStorage.getItem('email') + ''
      this.getUserTaskListByUserEmail();
   
  }

  getUserTaskListByUserEmail() {

    this.cardService.getCategories().subscribe(categories => {
      this.inputCategoryList = []
      console.log(categories)
      this.inputCategoryList = categories

      this.cardService.getDynamicUserTaskList().subscribe(tl => {
        this.inputTaskList = []
      console.log(tl)

        // this.inputTaskList = tl

        this.cardService.getTaskList().subscribe(tasks => {
          console.log(tasks)
          this.taskListMock = tasks


          //popolo card array 
          let i=0
          tl.forEach(task=> {
            let category=task.listName
            let position = task.taskPosition
            let description = task.taskName
            let card = new Card(description, position, category, i);
            this.cardList.push(card)
            console.log(card)
            i++;
          })

          
        })
      })


    })





  }

  drop(event: any) { // CdkDragDrop<string[]>
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

  loadArrays() {
    this.todo = [];
    this.inProgress = [];
    this.done = [];
    for (let task of this.taskList) {
      switch (task.listName) {
        case 'todo':
          this.todo.push(task.taskName)
          break;
        case 'progress':
          this.inProgress.push(task.taskName)
          break;
        case 'done':
          this.done.push(task.taskName)
          break;
        default:
          this.updateError = true
          break;
      }
    }
    if (!this.isFirstShifting) {
      this.containerCounter = this.containerCounter + 3
    }
    this.isLoading = false
  }

  //TODO: cdk-drop-list-0
  //IN PROGRESS: cdk-drop-list-1
  //DONE: cdk-drop-list-2

  updateTaskList(event: any) {
    this.isLoading = true;
    let task: Task;
    let listName = '';
    let taskName = '';
    let taskPosition: number;
    let taskId: any;
    let taskListId: any;

    taskPosition = event.currentIndex

    this.containerName = event.container.id
    let containerNumber = this.containerName.substring(this.containerName.lastIndexOf("-") + 1, this.containerName.length)
    let switchCondition = +containerNumber - this.containerCounter

    switch (switchCondition) {
      case 0:
        listName = 'todo'
        taskName = this.todo[event.currentIndex]
        break;
      case 1:
        listName = 'progress'
        taskName = this.inProgress[event.currentIndex]
        break;
      case 2:
        listName = 'done'
        taskName = this.done[event.currentIndex]
        break;
      default:
        this.updateError = true
    }


    taskId = this.taskList.find(task => (task.taskName == taskName))?.taskId
    taskListId = this.taskList.find(task => task.taskId == taskId)?.taskListId


    task = new Task(listName, taskName, taskPosition, taskId, taskListId)



  }

  printTask($event: any) {
    this.taskService.updateTaskList($event).subscribe(() => {
      this.updateError = false
      this.isFirstShifting = false
      this.taskList = [];
      this.getUserTaskListByUserEmail()
    }, () => {
      this.updateError = true
      this.isLoading = false

    })
  }


}
