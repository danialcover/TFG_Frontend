import {Group} from "../group/group";
import {Team} from "../../club/team/team";

export class GroupTeam {
  id: number | null;
  group: Group | null;
  team: Team | null;
  points: number | null;
  numMatchesPlayed: number | null;
  numWins: number | null;
  numDraws: number | null;
  numLosses: number | null;
  goalsScored: number | null;
  goalsConceded: number | null;
  matchOutcomes: number[] | null;

  constructor(id: number, group: Group, team: Team, points: number, numMatchesPlayed: number,
              numWins: number, numDraws: number, numLosses: number, goalsScored: number,
              goalsConceded: number, matchOutcomes: number[]) {
    this.id = id;
    this.group = new Group(group.id, group.league);
    this.team = new Team(team.id, team.name, team.club);
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
