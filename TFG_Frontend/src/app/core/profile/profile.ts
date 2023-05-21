export class Profile {
    id: number;
    roles: number[];
    email: string;
    firstName: string;
    lastName: string;
    token?: string;

    constructor(id: number, roles: number[], email: string, firstName: string, lastName: string, token?: string) {
        this.id = id;
        this.roles = roles;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.token = token;
    }

    static serializer(item: any): Profile {
        return new Profile(
            item.id,
            item.roles,
            item.user.email,
            item.user.first_name,
            item.user.last_name,
            item.token
        );
    }

}


