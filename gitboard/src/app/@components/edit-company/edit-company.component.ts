import { Component, OnInit } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/CompanyDTO';
import { CompanyNewAdminDTO } from 'src/app/@models/CompanyNewAdminDTO';
import { CompanyAdminService } from 'src/app/@services/company-admin.service';
import { CompanyService } from 'src/app/@services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {


  companyList: CompanyDTO[] = []


  companyAdminList: CompanyDTO[] = []


  companySelected!: CompanyDTO
  companyAdminSelected!: CompanyAdminDTO
  adminNotInCompany!:CompanyAdminDTO
  adminsNotInCompany: CompanyAdminDTO[] = []

  newCompanyName: string = ''

  startDate: any
  endDate: any

  constructor(private companyService: CompanyService, private companyAdminService: CompanyAdminService) { }

  ngOnInit(): void {
    this.getAllCompanies()
  }


  getAllAdminsNotInCompany() {
    this.companyAdminService.getAllAdminsNotInCompany(this.companySelected).subscribe(result => {
      this.adminsNotInCompany = result
    })
  }

  getAllCompanies() {
    this.companyService.getAll().subscribe(response => {
      this.companyList = response
    })
  }

  getAllAdminsByCompany() {
    this.companyAdminService.getAllCompanyAdmins(this.companySelected).subscribe(response => {
      this.companyAdminList = response
    })
  }

  editCompany() {
    console.log("company to edit: " + this.companySelected)
  }


  isCompanySelected() {
    if (this.companyAdminSelected) {
      this.getAllAdminsByCompany()
      return true
    }
    return false
  }

  deleteCompany() {
    console.log("company to delete: " + this.companySelected)
  }

  isFormValid() {
    if (this.startDate != undefined && this.endDate != undefined && this.newCompanyName != '' && this.companyAdminSelected != undefined) { return true }
    return false;
  }

  submitForm() {
    console.log(this.startDate)
    console.log(this.endDate)
    console.log(this.newCompanyName)
    console.log(this.companyAdminSelected)
  }

  updateCompanyAdmin(){
    let companyNewAdmin = new CompanyNewAdminDTO(this.companySelected,this.companyAdminSelected)
    this.companyService.updateCompanyAdmin(companyNewAdmin).subscribe(response => {
      console.log(response)
    })
  }

}
