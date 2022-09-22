import { Component, OnInit } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/CompanyDTO';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.scss']
})
export class AdminControlPanelComponent implements OnInit {

  isMenuVisible:boolean=true

  isCreateVisible:boolean=false
  isEditVisible:boolean=false



  constructor(){}
 
  ngOnInit(): void {

  }

  showMenu(){
    this.isMenuVisible=true
  }

  showDiv(div:string){
    this.isMenuVisible=false;
    this.isCreateVisible=false;
    this.isEditVisible=false;

    switch(div){
      case 'create':
        this.isCreateVisible=true;
        break;
      case 'edit':
          this.isEditVisible=true;
        break;
    }
  }

}
