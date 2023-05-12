export class Profile {
    id: number;
    roles: number[];
    email: string;
    firstName: string;
    lastName: string;

    constructor(id: number, roles: number[], email: string, firstName: string, lastName: string) {
        this.id = id;
        this.roles = roles;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
