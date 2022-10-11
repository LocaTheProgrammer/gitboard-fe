import { Component, OnInit } from '@angular/core';
import { AuthDTO } from 'src/app/@models/DTO/AuthDTO';
import { BasicUserDTO } from 'src/app/@models/DTO/BasicUserDTO';
import { UserAuth } from 'src/app/@models/DTO/UserAuth';
import { MessageService } from 'src/app/@services/message.service';
import { UserService } from 'src/app/@services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
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
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessageAndType()
    })
  }



  findAuths() {
    this.userService.findAuths().subscribe(auths => {
      this.authList = auths
    })

    this.userService.findAuths().subscribe({
      next: (auths) => this.authList = auths,
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessageAndType
    })

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

  setUser($event: any) {
    this.selectedUser = $event
  }

  setAuth($event: any) {
    this.selectedAuth = $event
  }

  updatePermission() {
    let userAuth: UserAuth = new UserAuth(this.selectedUser.email, this.selectedAuth.id)
    this.userService.updateUserAuth(userAuth).subscribe(
      () => {
        this.sendMessage('ok')
        this.setType('success')
      },
      () => {
        this.sendMessage('not ok')
        this.setType('danger')
      },
      () => {
        setTimeout(() => {
          this.clearMessages()
          this.clearTypes()
        }, 3 * 1000);
      },
    )
  }
}
