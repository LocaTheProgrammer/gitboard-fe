import { Task } from "./Task"

export class TaskListProject{
    public userEmail:string
    public task:Task

    constructor(userEmail:string, task:Task){
        this.task=task
        this.userEmail=userEmail
    }
}