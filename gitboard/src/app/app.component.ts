import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertType } from './@models/components/AlertType';
import { Message } from './@models/components/Message';
import { MessageService } from './@services/message.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gitboard';


  subscription: Subscription;
  typeSubscription: Subscription;

  messages: Message[] = [];
  counter = 0
  types: AlertType[] = []
  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
      } else {
        this.messages = [];
      }
    });

    this.typeSubscription = this.messageService.getTypeSubject().subscribe(type => {
      if (type) {
        this.types.push(type);
      } else {
        this.types = [];
      }
    })


  }
}
