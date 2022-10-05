export class DeletedCard {
    public category: string
    public projectName: string
    public taskName: string
    public userAssigned: string

    constructor(category: string, projectName: string, taskName: string, userAssigned: string) {
        this.category = category
        this.projectName = projectName
        this.taskName = taskName
        this.userAssigned = userAssigned
    }
}