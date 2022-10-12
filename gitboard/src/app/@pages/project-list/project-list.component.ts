import { Component, OnInit } from '@angular/core';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { AuthService } from 'src/app/@services/auth/AuthService';
import { MessageService } from 'src/app/@services/message.service';
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
  siteAdminRole: string = environment.siteAdminRole
  constructor(private projectService: ProjectService, private authService: AuthService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.email = this.authService.getEmailFromToken()
    this.role = this.authService.getAuthFromToken()

    if (this.email != '') {

      let user = new BasicUserDTO(this.email)
      if (this.role != '') {
        switch (this.role) {
          case this.adminRole:
            this.projectService.findAllCompanyProjectsByCompanyAdminEmail(user).subscribe(projs => {
              this.projectList.push(projs)
            })
            break;
          case this.siteAdminRole:
            this.projectService.findAll().subscribe({
              next: (projects) => {
                this.projectList = projects
              },
              error: () => {
                this.messageService.sendMessage("something went wrong")
                this.messageService.sendType("danger")
              },
              complete: () => {
                setTimeout(() => {
                  this.messageService.clearMessages()
                  this.messageService.clearType()
                }, 3 * 1000);
              }
            })
            break;
          default:
            this.projectService.findByUser(user).subscribe(projs => {
              this.projectList = projs
            })
        }
      }
    }
  }



}
