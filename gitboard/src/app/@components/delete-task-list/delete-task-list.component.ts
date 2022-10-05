import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/@models/DTO/Task';
import { MessageService } from 'src/app/@services/message.service';
import { TaskService } from 'src/app/@services/task.service';

@Component({
  selector: 'app-delete-task-list',
  templateUrl: './delete-task-list.component.html',
  styleUrls: ['./delete-task-list.component.scss']
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
    return this.taskService.findAllTaskList().subscribe(tasks => {
      console.log(tasks)
      this.tasks = tasks;
      for (let t of tasks) {
        this.tasksDescription.push(t.taskName)
      }
      console.log(this.tasksDescription)
    })
  }

  taskSelected($event: any) {
    let taskName = $event[0]
    let task = this.tasks.filter(t => t.taskName === taskName)[0]
    if (task !== undefined)
      this.taskListSelected = task
  }

  deleteTask() {
    console.log('deleting2')
    console.log(this.taskListSelected)
    this.taskService.deleteTaskList(this.taskListSelected).subscribe(() => {
      this.sendMessage('add ok')
      this.setType('success')

    },
      () => {
        this.sendMessage('add not ok')
        this.setType('danger')

      },
      () => {
        setTimeout(() => {
          this.clearMessages()
          this.clearTypes()
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
