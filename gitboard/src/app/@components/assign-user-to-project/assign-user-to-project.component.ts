import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CompanyDTO } from 'src/app/@models/DTO/CompanyDTO';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { ProjectUserDTO } from 'src/app/@models/DTO/ProjectUserDTO';
import { CompanyService } from 'src/app/@services/company.service';
import { MessageService } from 'src/app/@services/message.service';
import { ProjectService } from 'src/app/@services/project.service';
import { UserService } from 'src/app/@services/user.service';


@Component({
  selector: 'app-assign-user-to-project',
  templateUrl: './assign-user-to-project.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})

export class AssignUserToProjectComponent implements OnInit {

  companySelected!: CompanyDTO

  companyList: CompanyDTO[] = []
  projectList: ProjectDTO[] = []

  projectNameList: string[] = [];
  companyNameList: string[] = [];
  userEmailList: string[] = [];

  myControlCompany = new FormControl('');
  myControlProjets = new FormControl('');
  myControlUsers = new FormControl('');


  constructor(private ms: MessageService, private projectService: ProjectService, private companyService: CompanyService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadCompanies()

  }

  loadCompanies() {
    this.companyNameList = []

    this.companyService.getAll().subscribe({
      next: (companies) => {
        this.companyList = companies
        this.companyList.forEach(c => {
          this.companyNameList.push(c.name)
        })
      },
      error: () => this.ms.sendErrorMessage(),
      complete: () => this.ms.clearMessageAndType()
    })
  }



  loadProjectByCompany() {
    this.projectNameList = []
    this.companySelected = this.companyList.filter(company => company.name == this.myControlCompany.value)[0]
    this.projectService.getAllByCompany(this.companySelected).subscribe({
      next: (projs) => {
        this.projectList = projs
        projs.forEach((p: any) => {
          this.projectNameList.push(p.name)
        })
      },
      error: () => this.ms.sendErrorMessage(),
      complete: () => this.ms.clearMessages()
    })

  }

  loadUsersByCompany() {
    this.userEmailList = []

    this.userService.getAllByCompany(this.companySelected).subscribe({
      next: (users) => {
        if (users.length == 0) {
          this.ms.sendMessage("no user found for given company!")
          this.ms.sendType("warning")
        }
        users.forEach((u: any) => {
          this.userEmailList.push(u.email)
        })
      },
      error: () => this.ms.sendErrorMessage(),
      complete: () => this.ms.clearMessages()
    })

  }

  isFormSubmittable() {
    return !(this.myControlUsers.value == "" || this.myControlProjets.value == "")
  }

  save() {
    let proj = this.projectList.filter(proj => proj.name == this.myControlProjets.value)[0]

    if (proj.id != undefined) {
      let puDTO = new ProjectUserDTO(proj.id, this.myControlUsers.value);

      this.projectService.addUserToProject(puDTO).subscribe({
        next: () => {
          this.ms.sendMessage("user added to project")
          this.ms.sendType("success")
        },
        error: () => this.ms.sendErrorMessage(),
        complete: () => this.ms.clearMessages()
      })
    }
  }




}
