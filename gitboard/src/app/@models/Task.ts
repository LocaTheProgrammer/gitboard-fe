export class Task{
    public listName: string
    public taskName:string
    public taskPosition:number
    public taskId:number
    public taskListId:number

    constructor(listName:string, taskName:string, taskPosition:number, taskId:number, taskListId:number){
        this.listName=listName
        this.taskName=taskName
        this.taskPosition=taskPosition
        this.taskId=taskId
        this.taskListId=taskListId
    }

}