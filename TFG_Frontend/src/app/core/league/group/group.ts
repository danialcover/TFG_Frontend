export class Group {
    id: number | null;
    league: number | null;

    constructor(id?: number, league?: number) {
        this.id = id || null;
        this.league = league || null;
    }
}
