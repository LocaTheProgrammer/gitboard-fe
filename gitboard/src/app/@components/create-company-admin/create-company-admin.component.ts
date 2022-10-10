import { Component, OnInit } from '@angular/core';
import { AuthDTO } from 'src/app/@models/DTO/AuthDTO';
import { CompanyAdminNameDTO } from 'src/app/@models/DTO/CompanyAdminNameDTO';
import { SignUpDTO } from 'src/app/@models/DTO/SignUpDTO';
import { AuthorityService } from 'src/app/@services/authority.service';
import { CompanyAdminService } from 'src/app/@services/company-admin.service';

@Component({
  selector: 'app-create-company-admin',
  templateUrl: './create-company-admin.component.html',
  styleUrls: ['./create-company-admin.component.scss']
})
export class CreateCompanyAdminComponent implements OnInit {

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

  constructor(private companyAdminService: CompanyAdminService, private authorityService: AuthorityService) { }

  ngOnInit(): void {
  }


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

    //TODO FIXME
    this.authorityService.getAuthname(authName).subscribe({
      next: (gottenAuth: AuthDTO) => {
        let auth: AuthDTO = new AuthDTO(gottenAuth.id, gottenAuth.name)
        let cAdmin: SignUpDTO = new SignUpDTO(this.newCompanyAdminName, this.newCompanyAdminSurname, this.email, this.password, auth)

        this.companyAdminService.createCompanyAdmin(cAdmin).subscribe(() => {
          this.creationMessage = 'ok'
          this.alertType = 'success'
        },
          () => {
            this.alertType = 'danger'
            this.creationMessage = 'smth went wrong'
          },
          () => this.isCreated = true)
      },
      error: (err) => {

      }
    })

  }

}
