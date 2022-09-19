export class Task{
    public listName: string
    public taskName:string
    public taskPosition:number

    constructor(listName:string, taskName:string, taskPosition:number){
        this.listName=listName
        this.taskName=taskName
        this.taskPosition=taskPosition
    }

}