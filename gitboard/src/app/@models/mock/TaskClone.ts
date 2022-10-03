export class TaskClone{
    public listName: string
    public taskName:string
    public taskPosition:number
    public id:number
    public taskListId:number

    public projectId?:number

    //mock-only
    public taskListCategoryId?:number

    constructor(listName:string, taskName:string, taskPosition:number, taskId:number, taskListId:number, projectId?:number, taskListCategoryId?:number){
        this.listName=listName
        this.taskName=taskName
        this.taskPosition=taskPosition
        this.id=taskId
        this.taskListId=taskListId
        this.projectId=projectId
        this.taskListCategoryId=taskListCategoryId
    }

}