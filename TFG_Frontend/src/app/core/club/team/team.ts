import {Club} from "../club";

export class Team {
    id: number | null;
    name: string;
    club: Club | null;

    constructor(id?: number, name?: string, club?: Club) {
        this.id = id || null;
        this.name = name || '';
        this.club = club || null;
    }
}
