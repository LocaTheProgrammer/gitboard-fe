export class AdminPanelComponent{
    public condition:string
    public componentName:string
    public booleanCondition:boolean

    constructor(condition:string, componentName:string, booleanCondition:boolean){
        this.condition = condition
        this.componentName = componentName
        this.booleanCondition=booleanCondition
    }
}