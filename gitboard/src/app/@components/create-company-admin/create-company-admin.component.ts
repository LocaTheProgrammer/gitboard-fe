import { Component, OnInit } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/CompanyAdminDTO';
import { CompanyAdminNameDTO } from 'src/app/@models/CompanyAdminNameDTO';
import { CompanyAdminService } from 'src/app/@services/company-admin.service';

@Component({
  selector: 'app-create-company-admin',
  templateUrl: './create-company-admin.component.html',
  styleUrls: ['./create-company-admin.component.scss']
})
export class CreateCompanyAdminComponent implements OnInit {

  newCompanyAdmin: string = ''
  isCreated: boolean = false
  creationMessage: string = ''
  alertType!: string;
  constructor(private companyAdminService: CompanyAdminService) { }

  ngOnInit(): void {
  }

  isFormValid() {
    return this.newCompanyAdmin != ''
  }

  //TODO fare messaggio componente
  submitForm() {
    let admin: CompanyAdminNameDTO = new CompanyAdminNameDTO(this.newCompanyAdmin)
    this.companyAdminService.createCompanyAdmin(admin).subscribe(() => {
      this.creationMessage = 'ok'
      this.alertType = 'success'
    },
    () => {
      this.alertType = 'danger'
      this.creationMessage = 'smth went wrong'
    },
    () => this.isCreated = true)
  }
  
}
