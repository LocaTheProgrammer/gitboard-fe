
import { Component, OnInit } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/DTO/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/DTO/CompanyDTO';
import { CompanyAdminService } from 'src/app/@services/company-admin.service';
import { CompanyService } from 'src/app/@services/company.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  companyAdminList:any [] = [] 


  companySelected!:CompanyDTO
  companyAdminSelected : CompanyAdminDTO | undefined
  
  newCompanyName:string=''
  
  startDate:any
  endDate:any

  message:string=''

  isCompanySaved:boolean = false;
  noAvailableAdmin: boolean = false;
  alertType!: string;

  constructor(private companyAdminService:CompanyAdminService, private companyService:CompanyService) { }

  ngOnInit(): void {
   this.getFreeAdmins()
  }

  getFreeAdmins(){
    this.companyAdminSelected = undefined
    this.noAvailableAdmin=false;
    this.companyAdminService.findAllAvailableAdmin().subscribe(availableAdmins=>{
      this.companyAdminList=availableAdmins;
      if(this.companyAdminList.length == 0){
        this.noAvailableAdmin=true;
      }
    })
  }

  
  isCompanySelected(){
    return this.companySelected!=undefined ? true : false
  }

  isFormValid(){
    if(this.startDate!=undefined && this.endDate != undefined && this.newCompanyName!='' && this.companyAdminSelected != undefined) { return true }
    return false;
  }

  //TODO CHANGE MESSAGE
  submitForm(){
    this.isCompanySaved=false
    if(this.companyAdminSelected){
      let companyAdminArray:CompanyAdminDTO[]=[this.companyAdminSelected]
      let company = new CompanyDTO(this.newCompanyName,this.startDate,this.endDate,companyAdminArray)
      console.log(company)
      this.companyService.createCompany(company).subscribe(() =>{
        this.getFreeAdmins()
        this.message='ok'
        this.alertType="success"
      },
      ()=>{
        this.message='smth went wrong'
        this.alertType="danger"
      },
      ()=>this.isCompanySaved=true)
    }
    
  }

}
