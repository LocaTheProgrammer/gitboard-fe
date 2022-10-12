import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/@services/task.service';
import { CategoryDTO } from 'src/app/@models/DTO/CategoryDTO';
import { Task } from 'src/app/@models/DTO/Task';
import { TaskList } from 'src/app/@models/DTO/TaskList';
import { CategoryService } from 'src/app/@services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ProjectUserDTO } from 'src/app/@models/DTO/ProjectUserDTO';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { UserService } from 'src/app/@services/user.service';
import { UserDragDropInfoDTO } from 'src/app/@models/DTO/UserDragDropInfoDTO';
import { MessageService } from 'src/app/@services/message.service';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todo: string[] = [];
  inProgress: string[] = [];
  done: string[] = [];
  taskList: Task[] = [];
  email: string = ''
  isLoading: boolean = false;

  @ViewChild('modalbtn') myDiv!: ElementRef<HTMLElement>;


  containerName: string = ''
  containerCounter: number = 0
  isFirstShifting = true;

  updateError: boolean = false

  id: number | undefined
  isIdValid = true
  inputTaskList!: TaskList[]
  inputCategoryList!: CategoryDTO[]
  message: string = '';
  isRenderable: boolean = false

  userId!: number | undefined
  userAuth!: string
  openModal: boolean = false
  class: string = '';
  style: string = '';
  selectedTask: Task | undefined;

  image: string = ''

  constructor(private messageService: MessageService, private taskService: TaskService, private categoryService: CategoryService, private _Activatedroute: ActivatedRoute, private authService: AuthService, private userService: UserService) { }


  ngOnInit() {
    this.image = environment.vectorImage
    this.initialize()
  }

  initialize() {
    let id = this._Activatedroute.snapshot.paramMap.get("id");
    if (id != null && !isNaN(+id)) {
      this.id = +id;
      this.email = this.authService.getEmailFromToken()
      this.getUserTaskListByUserEmail();
    } else {
      this.message = "invalid project id"
      this.isIdValid = false
    }
  }


  getUserTaskListByUserEmail() {

    this.isRenderable = false;


    this.userService.getIdAndPermissionByEmail(this.email).subscribe({
      next: (dndInfo: UserDragDropInfoDTO) => {
        this.userId = dndInfo.id
        this.userAuth = dndInfo.authority
        //2nd block
        this.categoryService.getCategories().subscribe({
          next: (response) => {
            this.inputCategoryList = []
            this.inputCategoryList = response
            if (this.id != undefined) {
              let pu = new ProjectUserDTO(this.id, this.email)
              //3rd block
              this.taskService.getDynamicUserTaskList(pu).subscribe({
                next: (tl) => {
                  this.inputTaskList = []
                  if (tl.length > 0) {
                    this.inputTaskList = tl
                    this.isRenderable = true;
                  }
                },
                error: () => this.messageService.sendErrorMessage(),
                complete: () => this.messageService.clearMessageAndType()
              })
            }
          },
          error: () => this.messageService.sendErrorMessage(),
          complete: () => this.messageService.clearMessageAndType()
        })

      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
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

  printTask($event: any) {
    let task: Task = $event.task
    this.selectedTask = task
    this.containerCounter = $event.result

    if (task.listName.toLowerCase() != 'delete') {
      this.taskService.updateTaskList(task).subscribe(() => {
        this.updateError = false
        this.isFirstShifting = false
        this.taskList = [];
        this.getUserTaskListByUserEmail()
      }, () => {
        this.updateError = true
        this.isLoading = false

      })
    } else {
      let el: HTMLElement = this.myDiv.nativeElement;
      el.click();
    }

  }

  deleteTask() {
    if (this.selectedTask != undefined) {
      this.taskService.deleteTaskList(this.selectedTask).subscribe({
        next: () => {
          this.messageService.sendMessage('deleted!')
          this.messageService.sendType('success')
        },
        error: () => this.messageService.sendErrorMessage(),
        complete: () => this.messageService.clearMessageAndType()
      })
    }
  }



}
