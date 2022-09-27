import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-task-to-board',
  templateUrl: './add-task-to-board.component.html',
  styleUrls: ['./add-task-to-board.component.scss']
})
export class AddTaskToBoardComponent implements OnInit {

  project!: ProjectDTO;
  category!: CategoryDTO

  projectList: ProjectDTO[] = []
  categoryList:CategoryDTO [] = []
  taskList: TaskList[] = []
  isProjectListEmpty: boolean = false;
  userList: BasicUserDTO[] = [];
  user!:BasicUserDTO;

  isBoardUpdated:boolean=false

  task!:TaskDescription

  tasks!:TaskDescription[]
  message: string='';
  alertType!: string;


  constructor(
    private userService:UserService,
    private projectService: ProjectService, 
    private taskService: TaskService, 
    private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.findAllProjects()
    this.findAllCategories()
    this.findAllTask()
    this.findAllUsers() 
  }

  findAllCategories(){
    this.categoryService.getCategories().subscribe(categories =>{
      this.categoryList = categories
    })
  }

  findAllProjects() {
    this.isProjectListEmpty=false;
    this.projectService.findAll().subscribe(allProjects => {
      this.projectList = allProjects
      if(this.projectList.length == 0){
        this.isProjectListEmpty=true;
      }
    })
  }

  findAllUsers(){
    this.userService.findAllBasic().subscribe(users =>{
      this.userList=users
    })
  }

  findAllTask(){
    return this.taskService.findAllTask().subscribe(tasks =>{
      this.tasks = tasks;
      console.log(this.tasks)
    })
  }

  isFormValid() {
    return !(this.user==undefined || this.category==undefined || this.project == undefined || this.task == undefined)
  }


  //componente al posto della visualizzazione isBoard
  submitForm() {
    this.isBoardUpdated=false
    //(listName:string, taskName:string, taskPosition:number, taskId:number, taskListId:number)
    let task = new Task(this.category.description, this.task.description, 0, this.task.id, 0, this.project.id)
    let tlp = new TaskListProject(this.user.email, task);
    this.taskService.createTaskList(tlp).subscribe(() => {
      this.alertType='success'
      this.message='ok'
    },
    ()=>{
      this.alertType='danger'
      this.message='ooops'
    },()=>this.isBoardUpdated=true)
  }


}
