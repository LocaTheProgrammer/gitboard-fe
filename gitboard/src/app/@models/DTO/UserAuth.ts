export class UserAuth {
    public email: string
    public auth: string

    constructor(email: string, auth: string) {
        this.email = email
        this.auth = auth
    }
}