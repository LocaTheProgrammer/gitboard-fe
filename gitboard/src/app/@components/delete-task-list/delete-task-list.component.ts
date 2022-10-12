import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/@models/DTO/Task';
import { MessageService } from 'src/app/@services/message.service';
import { TaskService } from 'src/app/@services/task.service';

@Component({
  selector: 'app-delete-task-list',
  templateUrl: './delete-task-list.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class DeleteTaskListComponent implements OnInit {


  myControl = new FormControl('');
  tasksDescription: string[] = []
  tasks!: Task[]

  taskListSelected!: Task

  constructor(private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAllTaskList()
  }

  findAllTaskList() {

    return this.taskService.findAllTaskList().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        for (let t of tasks) {
          this.tasksDescription.push(t.taskName)
        }
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()

    })
  }

  taskSelected($event: any) {
    let taskName = $event[0]
    let task = this.tasks.filter(t => t.taskName === taskName)[0]
    if (task !== undefined)
      this.taskListSelected = task
  }

  deleteTask() {

    this.taskService.deleteTaskList(this.taskListSelected).subscribe({
      next: () => {
        this.messageService.sendMessage('delete ok')
        this.messageService.sendType('success')
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })


  }

}
