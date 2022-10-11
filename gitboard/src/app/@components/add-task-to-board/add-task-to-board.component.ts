import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { CategoryDTO } from 'src/app/@models/DTO/CategoryDTO';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { Task } from 'src/app/@models/DTO/Task';
import { TaskDescription } from 'src/app/@models/DTO/TaskDescription';
import { TaskListProject } from 'src/app/@models/DTO/TaskistProject';
import { TaskList } from 'src/app/@models/DTO/TaskList';

import { CategoryService } from 'src/app/@services/category.service';
import { ProjectService } from 'src/app/@services/project.service';
import { TaskService } from 'src/app/@services/task.service';
import { UserService } from 'src/app/@services/user.service';
import { map, startWith } from 'rxjs/operators';
import { MessageService } from 'src/app/@services/message.service';
@Component({
  selector: 'app-add-task-to-board',
  templateUrl: './add-task-to-board.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class AddTaskToBoardComponent implements OnInit {

  project!: ProjectDTO;
  category!: CategoryDTO

  projectList: ProjectDTO[] = []
  categoryList: CategoryDTO[] = []
  taskList: TaskList[] = []
  isProjectListEmpty: boolean = false;
  userList: BasicUserDTO[] = [];
  user!: BasicUserDTO;

  isBoardUpdated: boolean = false

  task!: TaskDescription
  tasksDescription: string[] = []
  tasks!: TaskDescription[]
  message: string = '';
  alertType!: string;

  taskAny: any

  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAllProjects()
    this.findAllCategories()
    this.findAllTask()
    this.findAllUsers()
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): any[] {
    const filterValue = value;
    return this.tasksDescription.filter(t => t.toLocaleLowerCase().includes(filterValue))
  }

  findAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => this.categoryList = categories,
      error: () => {
        this.sendMessage("something went wrong")
        this.setType("danger")
      },
      complete: () => {
        setTimeout(() => {
          this.clearMessages()
          this.clearTypes()
        }, 3 * 1000);
      }
    })


  }

  findAllProjects() {
    this.isProjectListEmpty = false;

    this.projectService.findAll().subscribe({
      next: (allProjects) => {
        this.projectList = allProjects
        if (this.projectList.length == 0) {
          this.isProjectListEmpty = true;
        }
      },
      error: () => {
        this.sendMessage("something went wrong loading projects")
        this.setType("danger")
      },
      complete: () => {
        setTimeout(() => {
          this.clearMessages()
          this.clearTypes()
        }, 3 * 1000);
      }
    })
  }

  findAllUsers() {
    this.userService.findAllBasic().subscribe({
      next: (users) => this.userList = users,
      error: () => {
        this.sendMessage("something went wrong loading users")
        this.setType("danger")
      },
      complete: () => {
        setTimeout(() => {
          this.clearMessages()
          this.clearTypes()
        }, 3 * 1000);
      }
    })

  }

  findAllTask() {
    return this.taskService.findAllTask().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        for (let t of tasks) {
          this.tasksDescription.push(t.description)
        }
      },
      error: () => {
        this.sendMessage("something went wrong loading finding all task")
        this.setType("danger")
      },
      complete: () => {
        setTimeout(() => {
          this.clearMessages()
          this.clearTypes()
        }, 3 * 1000);
      }
    })

  }

  isFormValid() {
    return !(this.user == undefined || this.category == undefined || this.project == undefined || this.myControl.value == undefined)
  }


  //componente al posto della visualizzazione isBoard
  submitForm() {
    this.isBoardUpdated = false

    // (listName:string, taskName:string, taskPosition:number, taskId:number, taskListId:number)
    let tFound: any = this.tasks.filter(task => task.description == this.myControl.value)

    let task = new Task(this.category.description, tFound[0].description, 0, tFound[0].id, 0, this.project.id)
    let tlp = new TaskListProject(this.user.email, task);


    this.taskService.createTaskList(tlp).subscribe({
      next: () => {
        this.alertType = 'success'
        this.message = 'ok'
      },
      error: () => {
        this.alertType = 'danger'
        this.message = 'ooops'
      },
      complete: () => this.isBoardUpdated = true
    })


  }



  setProject($event: any) {
    this.project = $event
  }

  setCategory($event: any) {
    this.category = $event
  }

  setUser($event: any) {
    this.user = $event
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
