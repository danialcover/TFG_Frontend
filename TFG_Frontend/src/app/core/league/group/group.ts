import {League} from "../league";

export class Group {
    id: number;
    league: number;

    constructor(id: number, league: number) {
        this.id = id;
        this.league = league;
    }
}
