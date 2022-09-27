import { CompanyAdminDTO } from "./CompanyAdminDTO";
import { CompanyAdminFullDTO } from "./CompanyAdminFullDTO";

export class ProjectDTO{
    public id?:number;
    public name:string;
    public companyAdminList: CompanyAdminFullDTO[];

    constructor(name:string, companyAdminList: CompanyAdminFullDTO[], id?:number){
        this.id=id;
        this.companyAdminList=companyAdminList
        this.name=name
    }
}
