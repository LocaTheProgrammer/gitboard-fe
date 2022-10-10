import { AuthDTO } from "./AuthDTO";

export class SignUpDTO {
    public name: string
    public surname: string
    public email: string
    public password: string
    public authorityDTO: AuthDTO

    constructor(
        name: string,
        surname: string,
        email: string,
        password: string,
        authorityDTO: AuthDTO
    ) {
        this.name = name
        this.surname = surname
        this.email = email
        this.password = password
        this.authorityDTO = authorityDTO
    }
}