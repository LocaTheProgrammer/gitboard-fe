import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormField } from 'src/app/@models/components/MatFormField';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { CompanyDTO } from 'src/app/@models/DTO/CompanyDTO';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { ProjectUserDTO } from 'src/app/@models/DTO/ProjectUserDTO';
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

  matFormFieldCompany!:MatFormField
  matFormFieldArrayProject!:MatFormField
  matFormFieldArrayUser!:MatFormField

  isMatFormCompanyLoaded:boolean=false
  isMatFormProjectLoaded:boolean=false
  isMatFormUserLoaded:boolean=false
  
  isAdded: boolean=false;
  alertType: string='';
  message: string='';

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

      this.matFormFieldCompany=new MatFormField('select company', this.myControlCompany, companies, this.filteredCompanies, 'autoC', 'Pick Me')

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

  isFormSubmittable() {
    return !(this.myControlUsers.value == "" || this.myControlProjets.value == "")
  }

  save() {
    let proj=this.projectList.filter(proj => proj.name=this.myControlProjets.value)

    if(proj[0].id!=undefined){
    console.log(proj[0])

      let puDTO = new ProjectUserDTO(proj[0].id, this.myControlUsers.value);
      this.projectService.addUserToProject(puDTO).subscribe(()=>{
        this.alertType='success'
        this.message='user added to proj'
      },
      ()=>{
        this.alertType='danger'
        this.message='user NOT added to proj'
      }, () => this.isAdded=true)
      
    }
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


}
