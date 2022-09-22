import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {

  newTaskName:string=''

  constructor() { }

  ngOnInit(): void {
  }

  isFormValid(){
    return true
  }

  submitForm(){
    console.log(true)
  }
}
