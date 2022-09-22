import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {


  newProjectName:string=''

  constructor() { }

  ngOnInit(): void {
  }

  isFormValid(){
    return this.newProjectName!=''
  }

  submitForm(){
    console.log(this.newProjectName)
  }
}
