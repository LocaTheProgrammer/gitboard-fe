import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/CompanyDTO';
import { ProjectDTO } from 'src/app/@models/projectDTO';
import { CompanyAdminService } from 'src/app/@services/company-admin.service';
import { CompanyService } from 'src/app/@services/company.service';
import { ProjectService } from 'src/app/@services/project.service';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss']
})
export class CreateBoardComponent implements OnInit {

  newBoardName: string = ''
  companyName:string = ''
  companyList: CompanyDTO[] = []
  companyAdminList: CompanyAdminDTO[] = []
  companySelected!: CompanyDTO 
  adminSelected!:CompanyAdminDTO
  message: string='';
  isProjectSaved: number=0;

  constructor(private companyService: CompanyService, private companyAdminService: CompanyAdminService, private projectService:ProjectService) { }

  ngOnInit(): void {
    this.getCompanyLists()
  }

  isCompanyAndAdminSelected(){
    return this.adminSelected != undefined
  }
  
  submitForm() {
    let admins : CompanyAdminDTO [] = [this.adminSelected]
    let project:ProjectDTO = new ProjectDTO(this.newBoardName, admins)
    this.projectService.create(project).subscribe(result =>{
      this.message=result.message
      this.isProjectSaved=1
    },
    error => {
      this.message=error.message
      this.isProjectSaved=2
    })
  }

  isFormValid() {
    return this.newBoardName != ''
  }

  isCompanySelected() {
    return this.companySelected != undefined
  }

  getCompanyLists() {
    this.companyService.getAll().subscribe(companies => {
      this.companyList = companies
    })
  }

  getAllCompanyAdmins(){
    this.companyAdminService.getAllCompanyAdmins(this.companySelected).subscribe(companyAdmins =>{
      this.companyAdminList = companyAdmins
    })
  }

}
