import {League} from "../league";

export class Group {
    id: number | null;
    league: League | null;

    constructor(id?: number, league?: League) {
        this.id = id || null;
        this.league = league || null;
    }
}
