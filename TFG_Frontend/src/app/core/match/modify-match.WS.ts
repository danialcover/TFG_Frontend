import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {Observable} from "rxjs";
import {Match} from "./match";

@Injectable({
  providedIn: "root"
})
export class ModifyMatchWS {

  constructor(private httpService: HttpService) {
  }

  serialize (data: Match): Record<string, any> {
    return {
      group: data.group,
      match_day: data.matchDay,
      group_team1: data.groupTeam1,
      group_team2: data.groupTeam2,
      location: data.location,
      date: data.date,
      team1_result: data.team1Result,
      team2_result: data.team2Result,
    }
  }

  execute(id: number, match: Match): Observable<Match> {
    let url: string = Urls.getMatchesURL() + id + '/';
    return this.httpService.put<Match>(url, this.serialize(match));
  }

}
