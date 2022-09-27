import { CompanyDTO } from "./CompanyDTO";
import { ProjectDTO } from "./ProjectDTO";

export class CompanyAdminFullDTO{
    public id: number;
    public name: string;
    public company:CompanyDTO;
    public project:ProjectDTO;
    public isBusy:boolean;

    constructor(id: number, name: string,company:CompanyDTO, project:ProjectDTO, isBusy:boolean){
        this.id=id
        this.name=name
        this.company=company
        this.project=project
        this.isBusy=isBusy
    }
}