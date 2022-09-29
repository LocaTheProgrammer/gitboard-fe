import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { CompanyDTO } from 'src/app/@models/DTO/CompanyDTO';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { CompanyService } from 'src/app/@services/company.service';
import { ProjectService } from 'src/app/@services/project.service';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-assign-user-to-project',
  templateUrl: './assign-user-to-project.component.html',
  styleUrls: ['./assign-user-to-project.component.scss']
})
export class AssignUserToProjectComponent implements OnInit {

  companySelected!: CompanyDTO
  projectSelected!: ProjectDTO
  userSelected!: BasicUserDTO

  companyList: CompanyDTO[] = []
  projectList: ProjectDTO[] = []
  userList: BasicUserDTO[] = []

  projectNameList: string[] = [];
  companyNameList: string[] = [];
  userEmailList: string[] = [];

  myControlCompany = new FormControl('');
  myControlProjets = new FormControl('');
  myControlUsers = new FormControl('');

  filteredCompanies!: Observable<string[]>;
  filteredProjects!: Observable<string[]>;
  filteredUsers!: Observable<string[]>;


  constructor(private projectService: ProjectService, private companyService: CompanyService, private userService: UserService) { }

  ngOnInit(): void {
    this.loadCompanies()
    this.filteredCompanies = this.myControlCompany.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCompany(value || '')),
    );
    this.filteredProjects = this.myControlProjets.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProject(value || '')),
    );
    this.filteredUsers = this.myControlUsers.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUser(value || '')),
    );
  }

  loadCompanies() {
    this.companyNameList = []
    this.companyService.getAll().subscribe(companies => {
      this.companyList = companies

      this.companyList.forEach(c => {
        this.companyNameList.push(c.name)
      })
    })
  }

  loadProjectByCompany() {
    this.projectNameList = []
    this.companySelected = this.companyList.filter(company => company.name = this.myControlCompany.value)[0]
    this.projectService.getAllByCompany(this.companySelected).subscribe(projs => {
      this.projectList = projs

      projs.forEach((p: any) => {
        this.projectNameList.push(p.name)
      })
    })
  }

  loadUsersByCompany() {
    this.userEmailList = []
    this.userService.getAllByCompany(this.companySelected).subscribe(users => {
      this.userList = users

      users.forEach((u: any) => {
        this.userEmailList.push(u.email)
      })
    })
  }



  private _filterCompany(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.companyNameList.filter(option => option.toLowerCase().includes(filterValue));
  }


  private _filterProject(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.projectNameList.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterUser(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.userEmailList.filter(option => option.toLowerCase().includes(filterValue));
  }

  isFormSubmittable() {
    return !(this.myControlUsers.value == "" || this.myControlProjets.value == "")
  }

  save() {
    console.log(this.companySelected)
    console.log(this.myControlUsers)
    console.log(this.myControlProjets)
  }

}
