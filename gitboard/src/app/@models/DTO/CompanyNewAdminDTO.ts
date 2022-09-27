import { CompanyAdminDTO } from "./CompanyAdminDTO";
import { CompanyDTO } from "./CompanyDTO";

export class CompanyNewAdminDTO{
    public company:CompanyDTO;
    public newAdmin:CompanyAdminDTO

    constructor(company:CompanyDTO, newAdmin:CompanyAdminDTO){
        this.company=company
        this.newAdmin=newAdmin
    }
}