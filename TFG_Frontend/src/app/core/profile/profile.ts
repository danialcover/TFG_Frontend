export class Profile {
    id: number | null;
    roles: number[] | null;
    email: string;
    firstName: string;
    lastName: string;

    constructor(id: number, roles: number[], email: string, firstName: string, lastName: string) {
        this.id = id || null;
        this.roles = roles;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
