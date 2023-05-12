export class GroupTeam {
  id: number;
  group: number;
  team: number;
  points: number;
  numMatchesPlayed: number;
  numWins: number;
  numDraws: number;
  numLosses: number;
  goalsScored: number;
  goalsConceded: number;
  matchOutcomes: number[];

  constructor(id: number, group: number, team: number, points: number, numMatchesPlayed: number,
              numWins: number, numDraws: number, numLosses: number, goalsScored: number,
              goalsConceded: number, matchOutcomes: number[]) {
    this.id = id;
    this.group = group;
    this.team = team;
    this.points = points;
    this.numMatchesPlayed = numMatchesPlayed;
    this.numWins = numWins;
    this.numDraws = numDraws;
    this.numLosses = numLosses;
    this.goalsScored = goalsScored;
    this.goalsConceded = goalsConceded;
    this.matchOutcomes = matchOutcomes;
  }
}
