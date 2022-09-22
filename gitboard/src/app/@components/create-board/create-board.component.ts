import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  newBoardName:string=''

  constructor() { }

  ngOnInit(): void {
  }

  submitForm(){
    console.log(this.newBoardName)
  }

  isFormValid(){
    return this.newBoardName!=''
  }

}
