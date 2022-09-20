import { Task } from "./Task";

export class UpdateTaskDTO {
    public email:string;
    public taskDTO:Task;
    constructor(email:string, taskDTO:Task){
        this.email=email
        this.taskDTO=taskDTO
    }
    
}
