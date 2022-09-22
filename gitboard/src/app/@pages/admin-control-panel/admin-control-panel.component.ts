import { Component, OnInit } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/CompanyDTO';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.scss']
})
export class AdminControlPanelComponent implements OnInit {

  isMenuVisible: boolean = true

  isCreateCompanyVisible: boolean = false
  isEditVisible: boolean = false
  isCreateTaskVisible: boolean = false
  isCreateBoardVisible: boolean = false
  isAssignVisible: boolean = false

  error: boolean = false

  constructor() { }

  ngOnInit(): void {

  }

  showMenu() {
    this.isMenuVisible = true
  }

  showDiv(div: string) {
    this.initializeView()
    switch (div) {
      case 'createCompany':
        this.isCreateCompanyVisible = true;
        break;
      case 'edit':
        this.isEditVisible = true;
        break;
      case 'createTask':
        this.isCreateTaskVisible = true;
        break;
      case 'createBoard':
        this.isCreateBoardVisible = true;
        break;
      case 'assign':
        this.isAssignVisible = true;
        break;
      default:
        this.error = true;
    }
  }

  initializeView() {
    this.isMenuVisible = false;
    this.isCreateCompanyVisible = false;
    this.isEditVisible = false;
    this.isCreateTaskVisible = false;
    this.error = false;
    this.isCreateBoardVisible = false;
    this.isAssignVisible = false

  }

}
