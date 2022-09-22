import { Component, OnInit } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/CompanyDTO';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  company1: CompanyDTO = new CompanyDTO (0, "kiko")
  company2: CompanyDTO = new CompanyDTO (1, "acer")
  company3: CompanyDTO = new CompanyDTO (2, "samsung")

  companyList:CompanyDTO [] = [this.company1, this.company2, this.company3] 

  companyAdmin1: CompanyDTO = new CompanyDTO (0, "pippo")
  companyAdmin2: CompanyDTO = new CompanyDTO (1, "pluto")
  companyAdmin3: CompanyDTO = new CompanyDTO (2, "paperino")

  companyAdminList:CompanyDTO [] = [this.companyAdmin1, this.companyAdmin2, this.companyAdmin3] 


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
