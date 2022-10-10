export class UserMailPassword {
    public mail: string
    public password: string
    public oldPassword: string

    constructor(mail: string, password: string, oldPassword: string) {
        this.mail = mail
        this.oldPassword = oldPassword
        this.password = password
    }
}