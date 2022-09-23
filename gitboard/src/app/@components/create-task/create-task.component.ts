import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/@services/task.service';
import { TaskDTO } from 'src/app/@services/TaskDTO';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  newTaskName:string=''
  message=''
  isTaskSaved:number = 0
  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
  }

  isFormValid(){
    return this.newTaskName != ''
  }

  submitForm(){
    let task = new TaskDTO(this.newTaskName);
    this.taskService.create(task).subscribe(result => {
      this.message=result.message
      this.isTaskSaved=1
    },
    error=>{
      this.message=error.message
      this.isTaskSaved=2
    })
  }
}
