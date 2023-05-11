import {Club} from "../club";

export class Team {
    id: number;
    name: string;
    club: Club;

    constructor(id: number, name: string, club: Club) {
        this.id = id;
        this.name = name || '';
        this.club = club;
    }
}
