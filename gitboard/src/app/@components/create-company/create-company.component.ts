
import { Component, OnInit } from '@angular/core';
import { CompanyAdminDTO } from 'src/app/@models/DTO/CompanyAdminDTO';
import { CompanyDTO } from 'src/app/@models/DTO/CompanyDTO';
import { CompanyAdminService } from 'src/app/@services/company-admin.service';
import { CompanyService } from 'src/app/@services/company.service';
import { MessageService } from 'src/app/@services/message.service';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
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
          this.sendMessage("no admin available")
          this.setType("warning")
        }
      },
      error: () => this.sendErrorMessage(),
      complete: () => this.clearMessageAndType()
    })

  }


  isCompanySelected() {
    return this.companySelected != undefined ? true : false
  }

  isFormValid() {
    if (this.startDate != undefined && this.endDate != undefined && this.newCompanyName != '' && this.companyAdminSelected != undefined) { return true }
    return false;
  }

  //TODO CHANGE MESSAGE
  submitForm() {
    this.isCompanySaved = false
    if (this.companyAdminSelected) {
      let companyAdminArray: CompanyAdminDTO[] = [this.companyAdminSelected]
      let company = new CompanyDTO(this.newCompanyName, this.startDate, this.endDate, companyAdminArray)
      this.companyService.createCompany(company).subscribe({
        next: () => {
          this.getFreeAdmins()
          this.sendMessage("ok")
          this.setType("success")
        },
        error: () => this.sendErrorMessage(),
        complete: () => this.clearMessageAndType()
      })
    }
  }


  setCompanyAdmin($event: any) {
    this.companyAdminSelected = $event
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
}
