import { Component, OnInit } from '@angular/core';
import { TaskModelMock } from 'src/app/@models/mock/TaskModelMock';
import { CardService } from 'src/app/@services/mock/card.service';

@Component({
  selector: 'app-manage-cards-mock',
  templateUrl: './manage-cards.component.html',
  styleUrls: ['./manage-cards.component.scss']
})
export class ManageCardsComponent implements OnInit {


  taskList: TaskModelMock[] = []
  taskSelected!: TaskModelMock

  mex: string = ''
  aType: string = ''

  isCallDone: boolean = false

  constructor(private mockCardService: CardService) { }

  ngOnInit(): void {
    this.getAllTasks()
  }


  getAllTasks() {
    this.mockCardService.getAllTask().subscribe(response => {
      this.taskList = response
    })
  }

  delete() {
    this.isCallDone = false
    this.mockCardService.deleteCard(this.taskSelected).subscribe(() => {
      this.aType = 'success'
      this.mex = 'delete ok'
    },
      () => {
        this.aType = 'danger'
        this.mex = 'delete NOT ok'
      },
      () => {
        this.getAllTasks()
        this.isCallDone = true
      })
  }
}
