import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/@services/task.service';
import { TaskDTO } from 'src/app/@models/DTO/TaskDTO';
import { MessageService } from 'src/app/@services/message.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class CreateTaskComponent implements OnInit {

  newTaskName: string = ''
  message = ''
  isTaskSaved: boolean = false;
  alertType!: string;
  constructor(private taskService: TaskService, private ms: MessageService) { }

  ngOnInit(): void {
  }

  isFormValid() {
    return this.newTaskName != ''
  }

  submitForm() {
    let task = new TaskDTO(this.newTaskName);
    this.taskService.create(task).subscribe({
      next: () => {
        this.ms.sendMessage("task created")
        this.ms.sendType("success")
      },
      error: () => this.ms.sendErrorMessage(),
      complete: () => this.ms.clearMessageAndType()
    })
  }





}
