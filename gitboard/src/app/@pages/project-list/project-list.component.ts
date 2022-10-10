import { Component, OnInit } from '@angular/core';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { ProjectService } from 'src/app/@services/project.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList: ProjectDTO[] = []
  email: string = ''
  role: string = ''
  adminRole: string = environment.adminRole
  constructor(private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.email = this.authService.getEmailFromToken()
    this.role = this.authService.getAuthFromToken()
    console.log(this.email)
    console.log(this.role)

    if (this.email != '') {
      let user = new BasicUserDTO(this.email)
      if (this.role != '' && this.role == this.adminRole) {
        this.projectService.findAllCompanyProjectsByCompanyAdminEmail(user).subscribe(projs => {
          this.projectList.push(projs)
        })
      } else {
        this.projectService.findByUser(user).subscribe(projs => {
          this.projectList = projs
        })
      }

    }
  }

}
