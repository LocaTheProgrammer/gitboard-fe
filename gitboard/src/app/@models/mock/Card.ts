export class Card{
    public id?:number
    public description:string
    public position:number
    public category:string

    constructor(description:string, position:number, category:string, id?:number,){
        this.category=category
        this.description=description
        this.id=id
        this.position=position
    }
}