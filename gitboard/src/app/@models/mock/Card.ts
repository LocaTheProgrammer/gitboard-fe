export class Card{
    public id?:number
    public description:string
    public position:number
    public category:string
    public taskListId?:number
    public taskId?:number

        constructor(description:string, position:number, category:string, taskListId?:number, taskId?:number, id?:number){
        this.category=category
        this.description=description
        this.id=id
        this.position=position
        this.taskListId=taskListId
        this.taskId=taskId
    }
}