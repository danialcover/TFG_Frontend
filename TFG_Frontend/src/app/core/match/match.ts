export class Match {
    id: number;
    group: number;
    referee?: number;
    location: number;
    team1: number;
    team2: number;
    comments?: string;
    date: Date;
    team1Result?: number;
    team2Result?: number;

    constructor(id: number, group: number, location: number, team1: number, team2: number, date: Date,
                referee?: number, comments?: string, team1Result?: number, team2Result?: number) {
        this.id = id;
        this.group = group;
        this.location = location;
        this.team1 = team1;
        this.team2 = team2;
        this.comments = comments;
        this.date = date;
        this.team1Result = team1Result;
        this.team2Result = team2Result;
        this.referee = referee;
    }
}
