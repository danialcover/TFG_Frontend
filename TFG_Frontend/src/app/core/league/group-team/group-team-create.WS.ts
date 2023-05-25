import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {GroupTeam} from "./group-team";

@Injectable({
  providedIn: "root"
})
export class GroupTeamCreateWS {

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

  serialize(groupTeam: GroupTeam): Record<string, any> {
    return {
      group: groupTeam.group,
      team: groupTeam.team,
      match_outcomes: this.mapMatchOutcomes(groupTeam.matchOutcomes)
    }
  }

  execute(groupTeam: GroupTeam): Observable<GroupTeam> {
    let url: string = Urls.getGroupTeamsURL();
    let data = this.serialize(groupTeam);
    return this.httpService.post<GroupTeam>(url, data);
  }
}
