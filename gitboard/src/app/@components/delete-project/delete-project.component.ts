import { Component, OnInit } from '@angular/core';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { MessageService } from 'src/app/@services/message.service';
import { ProjectService } from 'src/app/@services/project.service';

@Component({
  selector: 'app-delete-project',
  templateUrl: './delete-project.component.html',
  styleUrls: ['./delete-project.component.scss']
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
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessageAndType()
    })

  }

  setProject($event: any) {
    this.selectedProject = $event
  }

  deleteProject() {
    this.projectService.deleteProject(this.selectedProject).subscribe(
      {
        next: () => {
          this.sendMessage('ok')
          this.setType('success')
        },
        error: () => this.sendErrorMessage(),
        complete: () => this.clearMessageAndType()
      }
    )
  }

  sendErrorMessage() {
    this.sendMessage("something went wrong")
    this.setType("danger")
  }

  clearMessageAndType() {
    setTimeout(() => {
      this.clearMessages()
      this.clearTypes()
    }, 3 * 1000);
  }

  sendMessage(message: string): void {
    this.messageService.sendMessage(message);
  }

  setType(type: string) {
    this.messageService.sendType(type)
  }

  clearMessages(): void {
    this.messageService.clearMessages();
  }

  clearTypes() {
    this.messageService.clearType()
  }
}
