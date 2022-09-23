import { CompanyAdminDTO } from "./CompanyAdminDTO";

export class ProjectDTO{
    public id?:number;
    public name:string;
    public companyAdminList: CompanyAdminDTO[];

    constructor(name:string, companyAdminList: CompanyAdminDTO[], id?:number){
        this.id=id;
        this.companyAdminList=companyAdminList
        this.name=name
    }
}
