import { Component, OnInit } from '@angular/core';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { ProjectService } from 'src/app/@services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList!: ProjectDTO[]
  email: string = ''

  constructor(private projectService: ProjectService, private authService: AuthService) { }

  ngOnInit(): void {
    this.email = this.authService.getEmailFromToken()
    if (this.email != '') {
      let user = new BasicUserDTO(this.email)
      this.projectService.findByUser(user).subscribe(projs => {
        this.projectList = projs
      })
    }
  }

}
