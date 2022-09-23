import { CompanyAdminDTO } from "./CompanyAdminDTO";

export class CompanyDTO{
    public id?:number
    public name:string
    public startValidityDate:string;
    public endValidityDate:string;
    public companyAdmin:CompanyAdminDTO;

    constructor(name:string, starValidityDate:string, endValidityDate:string, companyAdmin:CompanyAdminDTO, id?:number){
        this.id=id
        this.name=name
        this.startValidityDate=starValidityDate
        this.endValidityDate=endValidityDate
        this.companyAdmin=companyAdmin
    }

}