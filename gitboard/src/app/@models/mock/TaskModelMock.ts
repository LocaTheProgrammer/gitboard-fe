export class TaskModelMock {
    public id?: number
    public taskName: string


    constructor(taskName:string, id?:number){
        this.taskName=taskName
        this.id=id
    }
}