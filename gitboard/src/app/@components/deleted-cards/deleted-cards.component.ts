import { Component, OnInit } from '@angular/core';
import { DeletedCard } from 'src/app/@models/DTO/DeletedCard';
import { MessageService } from 'src/app/@services/message.service';
import { TaskService } from 'src/app/@services/task.service';

@Component({
  selector: 'app-deleted-cards',
  templateUrl: './deleted-cards.component.html',
  styleUrls: ['./deleted-cards.component.scss']
})
export class DeletedCardsComponent implements OnInit {


  deletedTaskList!: DeletedCard[]

  constructor(private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAllDeleted()
  }

  findAllDeleted() {
    this.taskService.findAllDeletedCards().subscribe(
      {
        next: (deletedCardListResponse: DeletedCard[]) => this.deletedTaskList = deletedCardListResponse,
        error: () => this.sendErrorMessage(),
        complete: () => this.clearMessageAndType()
      }
    )

  }

  restore(card: DeletedCard) {

    this.taskService.restoreCard(card).subscribe({
      next: () => {
        this.sendMessage('ok')
        this.setType('success')
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
