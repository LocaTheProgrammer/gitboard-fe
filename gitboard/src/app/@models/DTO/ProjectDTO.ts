import { BasicUserDTO } from "./BasicUserDTO";
import { CompanyAdminDTO } from "./CompanyAdminDTO";
import { CompanyAdminFullDTO } from "./CompanyAdminFullDTO";

export class ProjectDTO{
    public id?:number;
    public name:string;
    public companyAdminList: CompanyAdminFullDTO[];
    public workers?:BasicUserDTO

    constructor(name:string, companyAdminList: CompanyAdminFullDTO[], id?:number, workers?:BasicUserDTO){
        this.id=id;
        this.companyAdminList=companyAdminList
        this.name=name
        this.workers=workers
    }
}
