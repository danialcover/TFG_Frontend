import {League} from "../league";

export class Group {
    id: number;
    league: League;

    constructor(id: number, league: League) {
        this.id = id;
        this.league = league;
    }
}
