export class UserAuth {
    public email: string
    public authId: number

    constructor(email: string, auth: number) {
        this.email = email
        this.authId = auth
    }
}