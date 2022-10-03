import { Component, OnInit } from '@angular/core';
import { CategoryDTO } from 'src/app/@models/DTO/CategoryDTO';
import { Task } from 'src/app/@models/DTO/Task';
import { TaskModelMock } from 'src/app/@models/mock/TaskModelMock';
import { CardService } from 'src/app/@services/mock/card.service';

@Component({
  selector: 'app-manage-cards-mock',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.scss']
})
export class ManageCardsComponent implements OnInit {


  taskList: TaskModelMock[] = []
  taskSelected!: TaskModelMock

  mex: string = ''
  aType: string = ''

  isCallDone: boolean = false
  categoryList: CategoryDTO[] = [];

  catSelected: string = ''

  constructor(private mockCardService: CardService) { }

  ngOnInit(): void {
    this.getAllTasks()
    this.getAllCategories()
  }

  getAllCategories() {
    this.mockCardService.getCategories().subscribe(
      response => {
        this.categoryList = response
      }
    )
  }

  getAllTasks() {
    this.mockCardService.getAllTask().subscribe(response => {
      this.taskList = response
    })
  }

  delete() {
    this.isCallDone = false
    this.mockCardService.deleteCard(this.taskSelected).subscribe(() => {
      this.aType = 'success'
      this.mex = 'delete ok'
    },
      () => {
        this.aType = 'danger'
        this.mex = 'delete NOT ok'
      },
      () => {
        this.getAllTasks()
        this.isCallDone = true
      })
  }


  setTaskSelected($event:any){
    this.taskSelected=$event
  }

  setCategorySelected($event:any){
    this.catSelected=$event
  }
  addTaskToList() {
    console.log(this.taskSelected)
    console.log(this.catSelected)
    // this.mockCardService.getDynamicUserTaskList().subscribe(taskListResponse => {
    //   let todoList: Task[] = []
    //   let progressList: Task[]=[]
    //   let doneList: Task[]=[]

    //   console.log(taskListResponse)
    //   taskListResponse.forEach(task => {
    //     switch (task.taskListCategoryId) {
    //       case 1:
    //         todoList.push(task)
    //         break;
    //       case 2:
    //         progressList.push(task)
    //         break;
    //       case 3:
    //         doneList.push(task)
    //         break;
    //       default:
    //         console.log("error");
    //     }
    //   })

    //   let newTask : any 

    //   switch (this.catSelected) {
    //     case 'todo':
    //       newTask = {
    //         taskListId:taskListResponse.length,
    //         isDeleted:false,
    //         taskPosition: todoList.length,
    //         taskListCategoryId:1,
    //         projectId: 1,
    //         taskId: this.taskList.length,
    //         userId:1
    //       }
    //     break;
    //     case 'progress':
    //       newTask = {
    //         taskListId:taskListResponse.length,
    //         isDeleted:false,
    //         taskPosition: progressList.length,
    //         taskListCategoryId:2,
    //         projectId: 1,
    //         taskId: this.taskList.length,
    //         userId:1
    //       }
    //     break;
    //     case 'done':
    //       newTask = {
    //         taskListId:taskListResponse.length,
    //         isDeleted:false,
    //         taskPosition: doneList.length,
    //         taskListCategoryId:2,
    //         projectId: 1,
    //         taskId: this.taskList.length,
    //         userId:1
    //       }
    //     break;
    //     default:
    //       console.log("error")
    //   }
    // })
  }
}
