import { Component, OnInit } from '@angular/core';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { ProjectDTO } from 'src/app/@models/DTO/ProjectDTO';
import { ProjectService } from 'src/app/@services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projectList!:ProjectDTO[]
  email:string = localStorage.getItem('email')+''

  constructor(private projectService:ProjectService) { }

  ngOnInit(): void {
    if(this.email!=''){
      let user = new BasicUserDTO(this.email)
      this.projectService.findByUser(user).subscribe(projs=>{
        this.projectList=projs
      })
    }
  }

}
