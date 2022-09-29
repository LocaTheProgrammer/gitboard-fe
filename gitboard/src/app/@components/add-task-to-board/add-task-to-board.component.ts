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
@Component({
  selector: 'app-add-task-to-board',
  templateUrl: './add-task-to-board.component.html',
  styleUrls: ['./add-task-to-board.component.scss']
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
  tasksDescription : string [] = []
  tasks!: TaskDescription[]
  message: string = '';
  alertType!: string;

  taskAny:any

  myControl = new FormControl('');
  filteredOptions!: Observable<string[]>;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private categoryService: CategoryService) { }

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
    this.categoryService.getCategories().subscribe(categories => {
      this.categoryList = categories
    })
  }

  findAllProjects() {
    this.isProjectListEmpty = false;
    this.projectService.findAll().subscribe(allProjects => {
      this.projectList = allProjects
      if (this.projectList.length == 0) {
        this.isProjectListEmpty = true;
      }
    })
  }

  findAllUsers() {
    this.userService.findAllBasic().subscribe(users => {
      this.userList = users
    })
  }

  findAllTask() {
    return this.taskService.findAllTask().subscribe(tasks => {
      console.log(tasks)
      this.tasks = tasks;
      for(let t of tasks){
        this.tasksDescription.push(t.description)
      }
      console.log(this.tasksDescription)

    })
  }

  isFormValid() {
    return !(this.user == undefined || this.category == undefined || this.project == undefined || this.myControl.value == undefined)
  }


  //componente al posto della visualizzazione isBoard
  submitForm() {
    console.log(this.myControl.value)
    this.isBoardUpdated = false

    console.log(this.tasks.filter(task => task.description == this.myControl.value))
    // (listName:string, taskName:string, taskPosition:number, taskId:number, taskListId:number)
    let tFound:any = this.tasks.filter(task => task.description == this.myControl.value)

    let task = new Task(this.category.description, tFound[0].description, 0, tFound[0].id, 0, this.project.id)
    let tlp = new TaskListProject(this.user.email, task);
    this.taskService.createTaskList(tlp).subscribe(() => {
      this.alertType = 'success'
      this.message = 'ok'
    },
      () => {
        this.alertType = 'danger'
        this.message = 'ooops'
      }, () => this.isBoardUpdated = true)
  }


}
