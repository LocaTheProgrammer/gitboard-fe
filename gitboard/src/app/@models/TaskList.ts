import { Task } from "./Task"

export class TaskList{
    public taskDTOList:Task[]

    constructor(taskDTOList:Task[]){
        this.taskDTOList=taskDTOList
    }
}