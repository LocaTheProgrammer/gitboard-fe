export class BasicUserDTO{
    public firstName?:string
    public lastName?:string
    public email:string

    constructor(email:string, firstName?:string, lastName?:string){
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
    }

}