export class Location {
    id: number;
    address: string;
    postalCode: string;
    city: string;

    constructor(id: number, address: string, postal_code: string, city: string) {
        this.id = id;
        this.address = address;
        this.postalCode = postal_code;
        this.city = city;
    }
}
