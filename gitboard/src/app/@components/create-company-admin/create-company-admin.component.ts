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
  creationStatus = 0;
  creationMessage: string = ''
  constructor(private companyAdminService: CompanyAdminService) { }

  ngOnInit(): void {
  }

  isFormValid() {
    return this.newCompanyAdmin != ''
  }

  submitForm() {
    let admin: CompanyAdminNameDTO = new CompanyAdminNameDTO(this.newCompanyAdmin)
    this.companyAdminService.createCompanyAdmin(admin).subscribe(ok => {
      this.creationStatus = 1
      this.creationMessage = ok.message
    },
      err => {
        this.creationStatus = 2
        this.creationMessage = err.message
      })
  }
}
