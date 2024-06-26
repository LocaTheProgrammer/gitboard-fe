import { Component } from '@angular/core';
import { AuthDTO } from 'src/app/@models/DTO/AuthDTO';
import { SignUpDTO } from 'src/app/@models/DTO/SignUpDTO';
import { AuthorityService } from 'src/app/@services/authority.service';
import { CompanyAdminService } from 'src/app/@services/company-admin.service';
import { MessageService } from 'src/app/@services/message.service';

@Component({
  selector: 'app-create-company-admin',
  templateUrl: './create-company-admin.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class CreateCompanyAdminComponent {

  newCompanyAdminName: string = ''
  newCompanyAdminSurname: string = ''
  email: string = ''
  isCreated: boolean = false
  creationMessage: string = ''
  alertType!: string;

  password: string = ''
  repeatPassword: string = ''

  isPasswordVisible: boolean = false
  isRepeatPasswordVisible: boolean = false
  strRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  constructor(private companyAdminService: CompanyAdminService, private authorityService: AuthorityService, private messageService: MessageService) { }

  isFormValid() {
    return this.strRegex.test(this.repeatPassword) && this.strRegex.test(this.password) && this.password == this.repeatPassword && this.email != ''
  }

  showPassword() {
    this.isPasswordVisible = !this.isPasswordVisible
  }

  showRepeatPassword() {
    this.isRepeatPasswordVisible = !this.isRepeatPasswordVisible
  }

  submitForm() {
    let authName = 'write'

    this.authorityService.getAuthname(authName).subscribe({
      next: (gottenAuth: AuthDTO) => {
        let auth: AuthDTO = new AuthDTO(gottenAuth.id, gottenAuth.name)
        let cAdmin: SignUpDTO = new SignUpDTO(this.newCompanyAdminName, this.newCompanyAdminSurname, this.email, this.password, auth)
        this.companyAdminService.createCompanyAdmin(cAdmin).subscribe({
          next: () => {
            this.messageService.sendMessage("company admin created")
            this.messageService.sendType("success")
          },
          error: () => this.messageService.sendErrorMessage(),
          complete: () => this.messageService.clearMessageAndType()
        })
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })

  }


}
