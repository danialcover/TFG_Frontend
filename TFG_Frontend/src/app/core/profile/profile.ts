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
            item.profile.id,
            item.profile.roles,
            item.profile.user.email,
            item.profile.user.first_name,
            item.profile.user.last_name,
            item.token
        );
    }

}


