export class DeletedCard {
    public category: string
    public projectName: string
    public taskName: string
    public userAssigned: string
    public taskId: number

    constructor(category: string, projectName: string, taskName: string, userAssigned: string, taskId: number) {
        this.category = category
        this.projectName = projectName
        this.taskName = taskName
        this.userAssigned = userAssigned
        this.taskId = taskId
    }
}