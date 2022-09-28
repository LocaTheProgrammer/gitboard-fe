import { Component } from '@angular/core';
import { AdminPanelComponent } from 'src/app/@models/components/AdminPanelComponent';
import { AdminPanelDiv } from 'src/app/@models/components/AdminPanelDiv';

@Component({
  selector: 'app-admin-control-panel',
  templateUrl: './admin-control-panel.component.html',
  styleUrls: ['./admin-control-panel.component.scss']
})
export class AdminControlPanelComponent {

  isMenuVisible: boolean = true

  isCreateCompanyVisible: boolean = false
  isEditVisible: boolean = false
  isCreateTaskVisible: boolean = false
  isCreateBoardVisible: boolean = false
  isAssignVisible: boolean = false

  error: boolean = false
  isCreateCompanyAdminVisible: boolean = false;

  createCompanyAdmin: AdminPanelDiv = new AdminPanelDiv("Create Company Admin", "createCompanyAdmin")
  createCompany: AdminPanelDiv = new AdminPanelDiv("Create Company", "createCompany")
  createTask: AdminPanelDiv = new AdminPanelDiv("Create Task", "createTask")
  createBoard: AdminPanelDiv = new AdminPanelDiv("Create Project Board", "createBoard")
  assign: AdminPanelDiv = new AdminPanelDiv("Assign Task to Project Board", "assign")
  edit: AdminPanelDiv = new AdminPanelDiv("Edit Company", "edit")

  divsArray: AdminPanelDiv[] = [this.createCompanyAdmin, this.createCompany, this.createTask, this.createBoard, this.assign, this.edit]

  // createCompanyAdminComponent: AdminPanelComponent = new AdminPanelComponent("isCreateCompanyVisible", "<app-create-company></app-create-company>", this.isCreateCompanyVisible)
  // createCompanyComponent: AdminPanelComponent = new AdminPanelComponent("isEditVisible", "<app-edit-company></app-edit-company>", this.isEditVisible)
  // createTaskComponent: AdminPanelComponent = new AdminPanelComponent("isCreateTaskVisible", "<app-create-task></app-create-task>", this.isCreateTaskVisible)
  // createBoardComponent: AdminPanelComponent = new AdminPanelComponent("isCreateBoardVisible", "<app-create-board></app-create-board>", this.isCreateBoardVisible)
  // assignComponent: AdminPanelComponent = new AdminPanelComponent("isAssignVisible", "<app-add-task-to-board></app-add-task-to-board>", this.isAssignVisible)
  // editComponent: AdminPanelComponent = new AdminPanelComponent("isCreateCompanyAdminVisible", "<app-create-company-admin></app-create-company-admin", this.isCreateCompanyAdminVisible)

  // divComponentsArray: AdminPanelComponent[] = [this.createCompanyAdminComponent, this.createCompanyComponent, this.createTaskComponent, this.createBoardComponent, this.assignComponent, this.editComponent]


  divVisibilityArray: boolean[] =
    [this.isCreateCompanyVisible,
    this.isEditVisible,
    this.isCreateTaskVisible,
    this.isCreateBoardVisible,
    this.isAssignVisible,
    this.isCreateCompanyAdminVisible]

  constructor() { }


  showMenu() {
    this.initializeView()
    this.isMenuVisible = true
  }

  showDiv(div: string) {
    console.log(div)
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
      case 'createCompanyAdmin':
        this.isCreateCompanyAdminVisible = true;
        break;
      default:
        this.error = true;
    }
    this.loadArray()
  }

  initializeView() {
    this.isMenuVisible = false;
    this.isCreateCompanyVisible = false;
    this.isEditVisible = false;
    this.isCreateTaskVisible = false;
    this.error = false;
    this.isCreateBoardVisible = false;
    this.isAssignVisible = false
    this.isCreateCompanyAdminVisible = false;
  }


  loadArray() {
    this.divVisibilityArray =
      [this.isCreateCompanyVisible,
      this.isEditVisible,
      this.isCreateTaskVisible,
      this.isCreateBoardVisible,
      this.isAssignVisible,
      this.isCreateCompanyAdminVisible]

    // for (let i = 0; i < this.divComponentsArray.length; i++) {
    //   this.divComponentsArray[i].booleanCondition = this.divVisibilityArray[i]
    // }
  }

}
