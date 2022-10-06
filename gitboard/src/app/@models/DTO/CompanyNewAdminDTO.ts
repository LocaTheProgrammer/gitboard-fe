import { CompanyAdminDTO } from "./CompanyAdminDTO";
import { CompanyDTO } from "./CompanyDTO";

export class CompanyNewAdminDTO {
    public companyDTO: CompanyDTO;
    public companyAdminDTO: CompanyAdminDTO

    constructor(company: CompanyDTO, newAdmin: CompanyAdminDTO) {
        this.companyDTO = company
        this.companyAdminDTO = newAdmin
    }
}