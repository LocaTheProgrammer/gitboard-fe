export class UserDragDropInfoDTO {
    public id: number
    public authority: string

    constructor(id: number, authority: string) {
        this.id = id
        this.authority = authority
    }
}