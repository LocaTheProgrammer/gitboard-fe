import { Component, OnInit } from '@angular/core';
import { AuthDTO } from 'src/app/@models/DTO/AuthDTO';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { UserAuth } from 'src/app/@models/DTO/UserAuth';
import { MessageService } from 'src/app/@services/message.service';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private messageService: MessageService, private userService: UserService) { }

  userList: BasicUserDTO[] = []
  authList: AuthDTO[] = []
  selectedUser!: BasicUserDTO
  selectedAuth!: AuthDTO
  ngOnInit(): void {
    this.findAll()
    this.findAuths()
  }

  findAll() {
    this.userService.findAllBasic().subscribe({
      next: (userListResponse) => {
        this.userList = userListResponse
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })
  }



  findAuths() {
    this.userService.findAuths().subscribe(auths => {
      this.authList = auths
    })

    this.userService.findAuths().subscribe({
      next: (auths) => this.authList = auths,
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })

  }



  setUser($event: any) {
    this.selectedUser = $event
  }

  setAuth($event: any) {
    this.selectedAuth = $event
  }

  updatePermission() {
    let userAuth: UserAuth = new UserAuth(this.selectedUser.email, this.selectedAuth.id)
    this.userService.updateUserAuth(userAuth).subscribe({
      next: () => {
        this.messageService.sendMessage('ok')
        this.messageService.sendType('success')
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })

  }
}
