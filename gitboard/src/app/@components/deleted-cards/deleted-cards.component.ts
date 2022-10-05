import { Component, OnInit } from '@angular/core';
import { DeletedCard } from 'src/app/@models/DTO/DeletedCard';
import { TaskService } from 'src/app/@services/task.service';

@Component({
  selector: 'app-deleted-cards',
  templateUrl: './deleted-cards.component.html',
  styleUrls: ['./deleted-cards.component.scss']
})
export class DeletedCardsComponent implements OnInit {


  deletedTaskList!: DeletedCard[]

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    console.log('mmmm ok')
    this.findAllDeleted()
  }

  findAllDeleted() {
    console.log('ok')
    this.taskService.findAllDeletedCards().subscribe((deletedCardListResponse: DeletedCard[]) => this.deletedTaskList = deletedCardListResponse)
  }

}
