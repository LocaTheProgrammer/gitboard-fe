import { Component, OnInit } from '@angular/core';
import { TaskModelMock } from 'src/app/@models/mock/TaskModelMock';
import { CardService } from 'src/app/@services/mock/card.service';

@Component({
  selector: 'app-create-card-mock',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {


  taskName:string=''
  mex: string = ''
  aType: string = ''

  isCallDone: boolean = false
  constructor(private cardMockService: CardService) { }

  ngOnInit(): void {
  }

  addTask(){
  this.isCallDone=false;

    let task:TaskModelMock= new TaskModelMock(this.taskName)
    this.cardMockService.addTask(task).subscribe(()=>{
      this.aType = 'success'
      this.mex = 'add ok'
    },
      () => {
        this.aType = 'danger'
        this.mex = 'add NOT ok'
      },
      () => {
        this.isCallDone = true
      })
  }

}
