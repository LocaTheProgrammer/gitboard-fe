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

  id!: number
  isIdValid = true
  inputTaskList!: TaskList[]
  inputCategoryList!: CategoryDTO[]
  message: string = '';
  isRenderable: boolean = false

  userId!: number
  userAuth!: string
  openModal: boolean = false
  class: string = '';
  style: string = '';
  selectedTask!: Task;

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
    this.userService.getIdAndPermissionByEmail(this.email).subscribe((dndInfo: UserDragDropInfoDTO) => {
      this.userId = dndInfo.id
      this.userAuth = dndInfo.authority
      this.categoryService.getCategories().subscribe(response => {
        this.inputCategoryList = []
        this.inputCategoryList = response
        let pu = new ProjectUserDTO(this.id, this.email)
        this.taskService.getDynamicUserTaskList(pu).subscribe(tl => {
          this.inputTaskList = []
          if (tl.length > 0) {
            this.inputTaskList = tl
            this.isRenderable = true;
          }
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
    this.taskService.deleteTaskList(this.selectedTask).subscribe(() => {
      this.sendMessage('deleted!')
      this.setType('success')

    },
      () => {
        this.sendMessage('smt went wrong!')
        this.setType('danger')

      },
      () => {
        setTimeout(() => {
          this.clearMessages()
          this.clearTypes()
          this.getUserTaskListByUserEmail()
        }, 3 * 1000);

      })
  }

  sendMessage(message: string): void {
    this.messageService.sendMessage(message);
  }

  setType(type: string) {
    this.messageService.sendType(type)
  }


  clearMessages(): void {
    this.messageService.clearMessages();
  }

  clearTypes() {
    this.messageService.clearType()
  }

}
