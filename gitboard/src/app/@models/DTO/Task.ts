export class Task{
    public listName: string
    public taskName:string
    public taskPosition:number
    public taskId:number
    public taskListId:number

    public projectId?:number

    //mock-only
    public taskListCategoryId?:number

    constructor(listName:string, taskName:string, taskPosition:number, taskId:number, taskListId:number, projectId?:number, taskListCategoryId?:number){
        this.listName=listName
        this.taskName=taskName
        this.taskPosition=taskPosition
        this.taskId=taskId
        this.taskListId=taskListId
        this.projectId=projectId
        this.taskListCategoryId=taskListCategoryId
    }

}