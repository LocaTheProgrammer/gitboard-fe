export class Task {
    public listName: string
    public taskName: string
    public taskPosition: number
    public taskId: number
    public taskListId: number

    public projectId?: number
    public userId?: number;

    //mock-only
    public taskListCategoryId?: number
    public id?: number

    constructor(listName: string, taskName: string, taskPosition: number, taskId: number, taskListId: number, projectId?: number, taskListCategoryId?: number, id?: number, userId?: number) {
        this.listName = listName
        this.taskName = taskName
        this.taskPosition = taskPosition
        this.taskId = taskId
        this.taskListId = taskListId
        this.projectId = projectId
        this.taskListCategoryId = taskListCategoryId
        this.id = id
        this.userId = userId
    }

}