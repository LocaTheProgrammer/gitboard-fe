export class Task{
    private listName: string
    private taskName:string
    private taskPosition:number

    constructor(listName:string, taskName:string, taskPosition:number){
        this.listName=listName
        this.taskName=taskName
        this.taskPosition=taskPosition
    }
}