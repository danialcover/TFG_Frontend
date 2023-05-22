export class Match {
    id: number;
    group: number;
    matchDay: number;
    referee?: number;
    location: number;
    groupTeam1: number;
    groupTeam2: number;
    comments?: string;
    date: Date;
    team1Result?: number;
    team2Result?: number;

    constructor(id: number, group: number, matchDay: number, location: number, team1: number, team2: number, date: Date,
                referee?: number, comments?: string, team1Result?: number, team2Result?: number) {
        this.id = id;
        this.group = group;
        this.matchDay = matchDay;
        this.location = location;
        this.groupTeam1 = team1;
        this.groupTeam2 = team2;
        this.comments = comments;
        this.date = date;
        this.team1Result = team1Result;
        this.team2Result = team2Result;
        this.referee = referee;
    }
}
