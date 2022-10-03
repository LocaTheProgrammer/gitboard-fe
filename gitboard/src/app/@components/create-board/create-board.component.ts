import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CompanyAdminFullDTO } from 'src/app/@models/DTO/CompanyAdminFullDTO';
import { CompanyDTO } from 'src/app/@models/DTO/CompanyDTO';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
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
  companyName: string = ''
  companyList: CompanyDTO[] = []
  companyAdminList: CompanyAdminFullDTO[] = []
  companySelected!: CompanyDTO
  adminSelected!: CompanyAdminFullDTO
  message: string = '';
  isProjectSaved: boolean = false;
  noAvailableAdmin: boolean = false;
  alertType!: string;

  constructor(private companyService: CompanyService, private companyAdminService: CompanyAdminService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getCompanyLists()
  }

  isCompanyAndAdminSelected() {
    return this.adminSelected != undefined
  }

  submitForm() {
    this.isProjectSaved = false
    this.adminSelected.company = this.companySelected
    let admins: CompanyAdminFullDTO[] = [this.adminSelected]
    let project: ProjectDTO = new ProjectDTO(this.newBoardName, admins)

    this.projectService.create(project).subscribe(() => {
      this.message = "oook"
      this.alertType="success"
    },
    () => {
      this.alertType="danger"
        this.message = "opsssss"
    },
    ()=>this.isProjectSaved=true)
  }

  isFormValid() {
    return this.newBoardName != ''
  }

  isCompanySelected() {
    return this.companySelected != undefined
  }

  getCompanyLists() {
    this.companyAdminList = []
    this.companyService.getAll().subscribe(companies => {
      this.companyList = companies
    })
  }

  getAllCompanyAdmins() {
    this.noAvailableAdmin = false
    this.companyAdminService.getAllCompanyAdmins(this.companySelected).subscribe(companyAdmins => {
      this.companyAdminList = companyAdmins
      if (this.companyAdminList.length == 0) {
        this.noAvailableAdmin = true;
      }
    })
  }


  setCompany($event:any){
    this.companySelected=$event
  }

  setCompanyAdmin($event:any){
    this.adminSelected=$event
  }

}
