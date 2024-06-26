import { Component } from '@angular/core';
import { AdminPanelComponent } from 'src/app/@models/components/AdminPanelComponent';
import { AdminPanelDiv } from 'src/app/@models/components/AdminPanelDiv';
import { MessageService } from 'src/app/@services/message.service';

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
  isAssignUserToProjectVisible: boolean = false
  isCreateUserVisible: boolean = false;
  isDeleteTaskListVisible: boolean = false;
  isDeletedCardVisible: boolean = false
  isDeleteProjectVisible: boolean = false
  isUpdateAuthVisible: boolean = false
  isUpdateUserVisible: boolean = false
  isChangePasswordVisible: boolean = false

  error: boolean = false
  isCreateCompanyAdminVisible: boolean = false;

  createCompanyAdmin: AdminPanelDiv = new AdminPanelDiv("Create Company Admin", "createCompanyAdmin")
  createCompany: AdminPanelDiv = new AdminPanelDiv("Create Company", "createCompany")
  createTask: AdminPanelDiv = new AdminPanelDiv("Create Task", "createTask")
  createBoard: AdminPanelDiv = new AdminPanelDiv("Create Project Board", "createBoard")
  assign: AdminPanelDiv = new AdminPanelDiv("Assign Task to Project Board", "assign")
  assignUserToProject: AdminPanelDiv = new AdminPanelDiv("Assign User To Project", "assignUserToProject")
  createUser: AdminPanelDiv = new AdminPanelDiv("Create User", "createUser")
  deleteTaskList: AdminPanelDiv = new AdminPanelDiv("Delete Task List", "deleteTaskList")
  deletedCards: AdminPanelDiv = new AdminPanelDiv("Deleted Cards", "deletedCards")
  deleteProject: AdminPanelDiv = new AdminPanelDiv("Delete project", "deleteProject")
  updateAuth: AdminPanelDiv = new AdminPanelDiv("Aggiorna permessi utente", "updateAuth")
  updateUser: AdminPanelDiv = new AdminPanelDiv("Aggiorna utente", "updateUser")
  changePassword: AdminPanelDiv = new AdminPanelDiv("Cambia password", "changePassword")

  divsArray: AdminPanelDiv[] =
    [this.createCompanyAdmin, this.createCompany, this.createTask, this.createBoard,
    this.assign, this.assignUserToProject,
    this.createUser, this.deleteTaskList, this.deletedCards, this.deleteProject,
    this.updateAuth, this.updateUser, this.changePassword]


  divVisibilityArray: boolean[] =
    [this.isCreateCompanyVisible,
    this.isCreateTaskVisible,
    this.isCreateBoardVisible,
    this.isAssignVisible,
    this.isCreateCompanyAdminVisible,
    this.isAssignUserToProjectVisible,
    this.isCreateUserVisible,
    this.isDeleteTaskListVisible,
    this.isDeletedCardVisible,
    this.isDeleteProjectVisible,
    this.isUpdateAuthVisible,
    this.isUpdateUserVisible,
    this.isChangePasswordVisible]

  constructor(private messageService: MessageService) { }

  clear() {
    this.messageService.clearMessages()
    this.messageService.clearType()
  }

  showMenu() {
    this.clear()
    this.initializeView()
    this.isMenuVisible = true
  }

  showDiv(div: string) {
    this.initializeView()
    switch (div) {
      case 'createCompany':
        this.isCreateCompanyVisible = true;
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
      case 'assignUserToProject':
        this.isAssignUserToProjectVisible = true;
        break;
      case 'createUser':
        this.isCreateUserVisible = true;
        break;
      case 'deleteTaskList':
        this.isDeleteTaskListVisible = true;
        break;
      case 'deletedCards':
        this.isDeletedCardVisible = true;
        break;
      case 'deleteProject':
        this.isDeleteProjectVisible = true;
        break;
      case 'updateAuth':
        this.isUpdateAuthVisible = true;
        break;
      case 'updateUser':
        this.isUpdateUserVisible = true;
        break;
      case 'changePassword':
        this.isChangePasswordVisible = true;
        break;
      default:
        this.error = true;
    }
    this.loadArray()
  }

  initializeView() {
    this.isMenuVisible = false;
    this.isCreateCompanyVisible = false;
    this.isCreateTaskVisible = false;
    this.error = false;
    this.isCreateBoardVisible = false;
    this.isAssignVisible = false
    this.isCreateCompanyAdminVisible = false;
    this.isAssignUserToProjectVisible = false;
    this.isCreateUserVisible = false
    this.isDeleteTaskListVisible = false
    this.isDeletedCardVisible = false
    this.isDeleteProjectVisible = false
    this.isUpdateAuthVisible = false
    this.isUpdateUserVisible = false
    this.isChangePasswordVisible = false
  }


  loadArray() {
    this.divVisibilityArray =
      [this.isCreateCompanyVisible,
      this.isCreateTaskVisible,
      this.isCreateBoardVisible,
      this.isAssignVisible,
      this.isCreateCompanyAdminVisible,
      this.isAssignUserToProjectVisible,
      this.isCreateUserVisible,
      this.isDeleteTaskListVisible,
      this.isDeletedCardVisible,
      this.isDeleteProjectVisible,
      this.isUpdateAuthVisible,
      this.isUpdateUserVisible,
      this.isChangePasswordVisible]
  }

}
