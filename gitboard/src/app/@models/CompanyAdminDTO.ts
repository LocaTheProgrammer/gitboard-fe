export class CompanyAdminDTO{
    public id:number
    public name:string
    public isBusy:boolean
    public companyId:number
    public projectId:number
    

    constructor(id:number, name:string, isBusy:boolean, companyId:number, projectId:number){
        this.id=id
        this.name=name
        this.isBusy=isBusy
        this.companyId=companyId
        this.projectId=projectId
    }
}