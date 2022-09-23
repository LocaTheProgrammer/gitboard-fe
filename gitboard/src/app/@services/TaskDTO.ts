export class TaskDTO{
    public description:string;
    public id?:number

    constructor(description:string, id?:number){
        this.description=description
        this.id=id
    }
}