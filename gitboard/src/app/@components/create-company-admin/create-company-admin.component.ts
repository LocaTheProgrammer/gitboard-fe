import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-company-admin',
  templateUrl: './create-company-admin.component.html',
  styleUrls: ['./create-company-admin.component.scss']
})
export class CreateCompanyAdminComponent implements OnInit {

  newCompanyAdmin:string=''

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
