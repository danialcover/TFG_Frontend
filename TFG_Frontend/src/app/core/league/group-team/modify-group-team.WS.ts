import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {GroupTeam} from "./group-team";
import {GroupTeamRepository} from "./group-team.repository";
import {group} from "@angular/animations";

@Injectable({
  providedIn: "root"
})
export class ModifyGroupTeamWS {

  constructor(private httpService: HttpService) {
  }

  mapMatchOutcomes(matchOutcomes: number[]): string {
    const numberToCharacterMap: { [key: number]: string } = {
      0: 'N',
      1: 'V',
      2: 'E',
      3: 'D'
    };
    let outcomes = matchOutcomes.map((outcome: number) => numberToCharacterMap[outcome]);
    return JSON.stringify(outcomes);
  }

  serialize(data: GroupTeam): Record<string, any> {
    return {
      group: data.group,
      team: data.team,
      goals_conceded: data.goalsConceded,
      goals_scored: data.goalsScored,
      match_outcomes: this.mapMatchOutcomes(data.matchOutcomes),
      num_matches_played: data.numMatchesPlayed,
      num_wins: data.numWins,
      num_losses: data.numLosses,
      num_draws: data.numDraws,
      points: data.points
    }
  }

  execute(groupTeam1: GroupTeam, groupTeam2: GroupTeam, matchResult: number, team1Result: number, team2Result: number): Observable<GroupTeam> {
    let urlGroupTeam1: string = Urls.getGroupTeamsURL() + groupTeam1.id + '/';
    let urlGroupTeam2: string = Urls.getGroupTeamsURL() + groupTeam2.id + '/';

    groupTeam1.goalsConceded = groupTeam1.goalsConceded + team2Result;
    groupTeam1.goalsScored = groupTeam1.goalsScored + team1Result;
    groupTeam2.goalsConceded = groupTeam2.goalsConceded + team1Result;
    groupTeam2.goalsScored = groupTeam2.goalsScored + team2Result;
    groupTeam1.numMatchesPlayed = groupTeam1.numMatchesPlayed + 1;
    groupTeam2.numMatchesPlayed = groupTeam2.numMatchesPlayed + 1;

    if (matchResult == 0) {
      groupTeam1.matchOutcomes = this.moveNumbers(groupTeam1.matchOutcomes, 1);
      groupTeam1.numWins = groupTeam1.numWins + 1;
      groupTeam1.points = groupTeam1.points + 3;

      groupTeam2.matchOutcomes = this.moveNumbers(groupTeam2.matchOutcomes, 3);
      groupTeam2.numLosses = groupTeam2.numLosses + 1;
    } else {
      if (matchResult == 1) {
        groupTeam1.matchOutcomes = this.moveNumbers(groupTeam1.matchOutcomes, 2);
        groupTeam1.numDraws = groupTeam1.numDraws + 1;
        groupTeam1.points = groupTeam1.points + 1;

        groupTeam2.matchOutcomes = this.moveNumbers(groupTeam2.matchOutcomes, 2);
        groupTeam2.numDraws = groupTeam2.numDraws + 1;
        groupTeam2.points = groupTeam2.points + 1;
      } else {
        groupTeam1.matchOutcomes = this.moveNumbers(groupTeam1.matchOutcomes, 3);
        groupTeam1.numLosses = groupTeam1.numLosses + 1;

        groupTeam2.matchOutcomes = this.moveNumbers(groupTeam2.matchOutcomes, 1);
        groupTeam2.numWins = groupTeam2.numWins + 1;
        groupTeam2.points = groupTeam2.points + 3;
      }
    }

    this.httpService.put<GroupTeam>(urlGroupTeam1, this.serialize(groupTeam1)).subscribe();
    return this.httpService.put<GroupTeam>(urlGroupTeam2, this.serialize(groupTeam2));
  }

  moveNumbers(numbers: number[], newNumber: number): number[] {
    const shiftedNumbers = [...numbers];
    for (let i = shiftedNumbers.length - 1; i >= 1; i--) {
      shiftedNumbers[i] = shiftedNumbers[i - 1];
    }
    shiftedNumbers[0] = newNumber;
    return shiftedNumbers;
  }

}
