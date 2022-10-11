import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/@services/task.service';
import { TaskDTO } from 'src/app/@models/DTO/TaskDTO';
import { MessageService } from 'src/app/@services/message.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  newTaskName: string = ''
  message = ''
  isTaskSaved: boolean = false;
  alertType!: string;
  constructor(private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  isFormValid() {
    return this.newTaskName != ''
  }

  submitForm() {
    let task = new TaskDTO(this.newTaskName);
    this.taskService.create(task).subscribe(() => {
      this.message = 'ok'
      this.alertType = "success"
    },
      () => {
        this.alertType = "danger"
        this.message = 'smth went wrong'
      }, () => this.isTaskSaved = true)
    this.taskService.create(task).subscribe({
      next: () => {
        this.sendMessage("task created")
        this.setType("success")
      },
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessageAndType()
    })
  }


  sendErrorMessage() {
    this.sendMessage("something went wrong")
    this.setType("danger")
  }

  clearMessageAndType() {
    setTimeout(() => {
      this.clearMessages()
      this.clearTypes()
    }, 3 * 1000);
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
