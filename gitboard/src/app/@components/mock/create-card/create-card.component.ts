import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskModelMock } from 'src/app/@models/mock/TaskModelMock';
import { MessageService } from 'src/app/@services/message.service';
import { CardService } from 'src/app/@services/mock/card.service';

@Component({
  selector: 'app-create-card-mock',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {


  taskName: string = ''
  mex: string = ''
  aType: string = ''

  isCallDone: boolean = false



  constructor(private cardMockService: CardService, private messageService: MessageService) {

  }

  ngOnInit(): void {
  }

  addTask() {
    this.isCallDone = false;

    let task: TaskModelMock = new TaskModelMock(this.taskName)
    this.cardMockService.addTask(task).subscribe(() => {
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
