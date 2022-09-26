import { Component, OnInit } from '@angular/core';
import { BasicUserDTO } from 'src/app/@models/BasicUserDTO';
import { CategoryDTO } from 'src/app/@models/CategoryDTO';
import { ProjectDTO } from 'src/app/@models/projectDTO';
import { Task } from 'src/app/@models/Task';
import { TaskDescription } from 'src/app/@models/TaskDescription';
import { TaskListProject } from 'src/app/@models/TaskistProject';
import { TaskList } from 'src/app/@models/TaskList';
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


  action = 0;


  project!: ProjectDTO;
  category!: CategoryDTO

  projectList: ProjectDTO[] = []
  categoryList:CategoryDTO [] = []
  taskList: TaskList[] = []
  isProjectListEmpty: boolean = false;
  userList: BasicUserDTO[] = [];
  user!:BasicUserDTO;


  task!:TaskDescription

  tasks!:TaskDescription[]


  constructor(private userService:UserService, private projectService: ProjectService, private taskService: TaskService, private categoryService:CategoryService) { }

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
    if(this.user==undefined || this.category==undefined || this.project == undefined || this.task == undefined){return false}
    return true;
  }

  submitForm() {
    //(listName:string, taskName:string, taskPosition:number, taskId:number, taskListId:number)
    let task = new Task(this.category.description, this.task.description, 0, this.task.id, 0, this.project.id)
    let tlp = new TaskListProject(this.user.email, task);
    this.taskService.createTaskList(tlp).subscribe(response => {
      console.log(response)
    })
  }

  changeAction(value: number) {
    this.action = value;
  }
}
