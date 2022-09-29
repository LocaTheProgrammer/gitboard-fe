export class ProjectUserDTO{
    public projectID:number;
    public userEmail:string;

    constructor(projectID:number, userEmail:string){
        this.projectID=projectID
        this.userEmail=userEmail
    }
}