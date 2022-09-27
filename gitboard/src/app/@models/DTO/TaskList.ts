import { Task } from "./Task"

export class TaskList{
    public taskListDTOList:Task[]

    constructor(taskDTOList:Task[]){
        this.taskListDTOList=taskDTOList
    }
}