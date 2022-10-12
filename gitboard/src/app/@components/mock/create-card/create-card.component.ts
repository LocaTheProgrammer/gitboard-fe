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
      this.messageService.sendMessage('add ok')
      this.messageService.sendType('success')

    },
      () => {
        this.messageService.sendMessage('add not ok')
        this.messageService.sendType('danger')

      },
      () => {
        setTimeout(() => {
          this.messageService.clearMessages()
          this.messageService.clearType()
        }, 3 * 1000);

      })
  }



}
