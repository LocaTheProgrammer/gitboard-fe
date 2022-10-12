
import { Component, OnInit } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/DTO/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/DTO/CompanyDTO';
import { CompanyAdminService } from 'src/app/@services/company-admin.service';
import { CompanyService } from 'src/app/@services/company.service';
import { MessageService } from 'src/app/@services/message.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./../admin-panel-control.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  companyAdminList: any[] = []


  companySelected!: CompanyDTO
  companyAdminSelected: CompanyAdminDTO | undefined

  newCompanyName: string = ''

  startDate: any
  endDate: any

  message: string = ''

  isCompanySaved: boolean = false;
  noAvailableAdmin: boolean = false;
  alertType!: string;

  constructor(private messageService: MessageService, private companyAdminService: CompanyAdminService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getFreeAdmins()
  }

  getFreeAdmins() {
    this.companyAdminSelected = undefined
    this.noAvailableAdmin = false;

    this.companyAdminService.findAllAvailableAdmin().subscribe({
      next: (availableAdmins) => {
        this.companyAdminList = availableAdmins;
        if (this.companyAdminList.length == 0) {
          this.messageService.sendMessage("no admin available")
          this.messageService.sendType("warning")
        }
      },
      error: () => this.messageService.sendErrorMessage(),
      complete: () => this.messageService.clearMessageAndType()
    })

  }


  isCompanySelected() {
    return this.companySelected != undefined ? true : false
  }

  isFormValid() {
    if (this.startDate != undefined && this.endDate != undefined && this.newCompanyName != '' && this.companyAdminSelected != undefined) { return true }
    return false;
  }

  submitForm() {
    this.isCompanySaved = false
    if (this.companyAdminSelected) {
      let companyAdminArray: CompanyAdminDTO[] = [this.companyAdminSelected]
      let company = new CompanyDTO(this.newCompanyName, this.startDate, this.endDate, companyAdminArray)
      this.companyService.createCompany(company).subscribe({
        next: () => {
          this.getFreeAdmins()
          this.messageService.sendMessage("ok")
          this.messageService.sendType("success")
        },
        error: () => this.messageService.sendErrorMessage(),
        complete: () => this.messageService.clearMessageAndType()
      })
    }
  }


  setCompanyAdmin($event: any) {
    this.companyAdminSelected = $event
  }


}
