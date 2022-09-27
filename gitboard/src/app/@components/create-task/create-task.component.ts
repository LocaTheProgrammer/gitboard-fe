import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/@services/task.service';
import { TaskDTO } from 'src/app/@models/DTO/TaskDTO';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  newTaskName:string=''
  message=''
  isTaskSaved:boolean=false;
  alertType!: string;
  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
  }

  isFormValid(){
    return this.newTaskName != ''
  }

  submitForm(){
    let task = new TaskDTO(this.newTaskName);
    this.taskService.create(task).subscribe(() => {
      this.message='ok'
      this.alertType="success"
    },
    ()=>{
      this.alertType="danger"
      this.message='smth went wrong'
    },()=>this.isTaskSaved=true)
  }
}
