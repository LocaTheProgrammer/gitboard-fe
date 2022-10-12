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
        error: () => this.messageService.sendErrorMessage(),
        complete: () => this.messageService.clearMessageAndType()
      }
    )

  }

  restore(card: DeletedCard) {

    this.taskService.restoreCard(card).subscribe({
      next: () => {
        this.messageService.sendMessage('ok')
        this.messageService.sendType('success')
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })

  }






}
