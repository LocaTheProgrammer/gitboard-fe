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


  subscription: Subscription;
  messages: any[] = [];
  constructor(private cardMockService: CardService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
  }

  ngOnInit(): void {
  }

  addTask() {
    this.isCallDone = false;

    let task: TaskModelMock = new TaskModelMock(this.taskName)
    this.cardMockService.addTask(task).subscribe(() => {
      this.sendMessage('add ok')
      this.aType = 'success'
      this.mex = this.messages[0].text
    },
      () => {
        this.sendMessage('add not ok')
        this.aType = 'danger'
        this.mex = this.messages[0].text
      },
      () => {
        this.isCallDone = true
        this.clearMessages()
      })
  }

  sendMessage(message: string): void {
    // send message to subscribers via observable subject
    this.messageService.sendMessage(message);
  }

  clearMessages(): void {
    // clear messages
    this.messageService.clearMessages();
  }

}
