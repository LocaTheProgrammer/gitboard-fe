import { Component, OnInit } from '@angular/core';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { MessageService } from 'src/app/@services/message.service';
import { ProjectService } from 'src/app/@services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class DeleteProjectComponent implements OnInit {


  projectList: ProjectDTO[] = []
  selectedProject!: ProjectDTO
  constructor(private projectService: ProjectService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.findAllProjects()
  }


  findAllProjects() {
    this.projectService.findAll().subscribe(responseProjects => {
      this.projectList = responseProjects
    })

    this.projectService.findAll().subscribe({
      next: (responseProjects) => this.projectList = responseProjects,
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })

  }

  setProject($event: any) {
    this.selectedProject = $event
  }

  deleteProject() {
    this.projectService.deleteProject(this.selectedProject).subscribe(
      {
        next: () => {
          this.messageService.sendMessage('ok')
          this.messageService.sendType('success')
        },
        error: () => this.messageService.sendErrorMessage(),
        complete: () => this.messageService.clearMessageAndType()
      }
    )
  }


}
