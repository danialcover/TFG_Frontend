import {Club} from "../club";

export class Location {
    id: number | null;
    address: string | null;
    postalCode: string | null;
    city: string | null;
    club: Club | null;

    constructor(id?: number, address?: string, postal_code?: string, city?: string, club?: Club) {
        this.id = id || null;
        this.address = address || null;
        this.postalCode = postal_code || null;
        this.city = city || null;
        this.club = club || null;
    }
}
