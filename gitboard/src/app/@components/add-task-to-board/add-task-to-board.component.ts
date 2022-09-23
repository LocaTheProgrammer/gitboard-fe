import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompanyAdminDTO } from 'src/app/@models/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/CompanyDTO';

@Component({
  selector: 'app-add-task-to-board',
  templateUrl: './add-task-to-board.component.html',
  styleUrls: ['./add-task-to-board.component.scss']
})
export class AddTaskToBoardComponent implements OnInit {


  toppings = new FormControl('');


  companyList:CompanyDTO [] = [] 



  companyAdminList:CompanyDTO [] = [] 


  companySelected!:CompanyDTO
  companyAdminSelected!:CompanyAdminDTO
  
  newCompanyName:string=''
  
  startDate:any
  endDate:any

  constructor() { }

  ngOnInit(): void {
  }

  editCompany(){
    console.log("company to edit: "+this.companySelected)
  }

  
  isCompanySelected(){
    return this.companySelected!=undefined ? true : false
  }

  deleteCompany(){
    console.log("company to delete: "+this.companySelected)
  }

  isFormValid(){
    if(this.startDate!=undefined && this.endDate != undefined && this.newCompanyName!='' && this.companyAdminSelected != undefined) { return true }
    return false;
  }

  submitForm(){
    console.log(this.startDate)
    console.log(this.endDate)
    console.log(this.newCompanyName)
    console.log(this.companyAdminSelected)
  }
}
