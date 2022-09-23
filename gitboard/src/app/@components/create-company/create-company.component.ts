import { ThisReceiver } from '@angular/compiler';
import { AfterContentChecked, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/CompanyDTO';
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

  //0 nulla
  //1 ok
  //2 errr
  isCompanySaved=0;

  constructor(private companyAdminService:CompanyAdminService, private companyService:CompanyService) { }

  ngOnInit(): void {
   this.getFreeAdmins()
  }

  getFreeAdmins(){
    this.companyAdminSelected = undefined
    this.companyAdminService.findAllAvailableAdmin().subscribe(availableAdmins=>{
      this.companyAdminList=availableAdmins;
    })
  }

  
  isCompanySelected(){
    return this.companySelected!=undefined ? true : false
  }

  isFormValid(){
    if(this.startDate!=undefined && this.endDate != undefined && this.newCompanyName!='' && this.companyAdminSelected != undefined) { return true }
    return false;
  }

  submitForm(){
    let company = new CompanyDTO(this.newCompanyName,this.startDate,this.endDate,this.companyAdminSelected!, 0)
    this.companyService.createCompany(company).subscribe(result =>{
      this.getFreeAdmins()
      this.message=result.message
      this.isCompanySaved=1
    },
    err=>{
      this.message=err.message
      this.isCompanySaved=2
    })
  }

}
