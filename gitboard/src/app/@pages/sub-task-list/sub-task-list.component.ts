import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CategoryDTO } from 'src/app/@models/DTO/CategoryDTO';
import { Task } from 'src/app/@models/DTO/Task';
import { TaskList } from 'src/app/@models/DTO/TaskList';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { CategoryService } from 'src/app/@services/category.service';
import { MessageService } from 'src/app/@services/message.service';
import { SubCardService } from 'src/app/@services/sub-card.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub-task-list',
  templateUrl: './sub-task-list.component.html',
  styleUrls: ['./sub-task-list.component.scss']
})
export class SubTaskListComponent implements OnChanges {
  @ViewChild('modalbtn') myDiv!: ElementRef<HTMLElement>;

  @Input() id!: number

  todo: string[] = [];
  inProgress: string[] = [];
  done: string[] = [];
  taskList: Task[] = [];
  inputTaskList!: TaskList[]
  isRenderable: boolean = false

  isSubTaskPresent: boolean = false

  inputCategoryList!: CategoryDTO[]

  containerCounter: number = 0

  taskListId!: string

  image: string = environment.vectorImage

  isLoading: boolean = false

  constructor(private subCardService: SubCardService, private categoryService: CategoryService, private messageService: MessageService, private authService: AuthService) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.initialize()
  }

  initialize() {
    this.taskListId = this.id + ''
    this.getCategories()
  }

  getUserAuth() {
    return this.authService.getAuthFromToken()
  }


  getCategories() {
    this.isRenderable = false
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.inputCategoryList = []
        this.inputCategoryList = response
        this.getSubTaskListById()
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => {
        this.messageService.clearMessageAndType()
        this.isRenderable = true
      }
    })
  }

  getSubTaskListById() {
    this.subCardService.getByTaskListId(this.taskListId).subscribe({
      next: (list) => {
        if (list.length > 0) {
          this.inputTaskList = list
          this.isSubTaskPresent = true
        } else {
          this.messageService.sendMessage("no sub task present!!!!")
          this.messageService.sendType("info")
          this.inputTaskList = []
          this.isSubTaskPresent = false
        }
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })
  }

  printTask($event: any) {
    console.log($event)
    this.containerCounter = $event.result
    this.getSubTaskListById()
    let task: Task = $event.task

    console.log(task)
    if (task.listName.toLowerCase() != 'delete') {
      this.subCardService.updateTaskList(task).subscribe({
        next: () => {
          this.isLoading = true
          this.taskList = [];
          this.initialize()
        },
        error: () => {
          this.messageService.sendErrorMessage()
        },
        complete: () => {
          this.messageService.clearMessageAndType()
          this.isLoading = false
        }
      })
    } else {
      let el: HTMLElement = this.myDiv.nativeElement;
      el.click();
    }
  }

  deleteTask() {
    // if (this.selectedTask != undefined) {
    //   this.taskService.deleteTaskList(this.selectedTask).subscribe({
    //     next: () => {
    //       this.messageService.sendMessage('deleted!')
    //       this.messageService.sendType('success')
    //     },
    //     error: () => this.messageService.sendErrorMessage(),
    //     complete: () => this.messageService.clearMessageAndType()
    //   })
    // }
  }

}
