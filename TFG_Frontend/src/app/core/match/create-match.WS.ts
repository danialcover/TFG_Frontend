import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {Observable} from "rxjs";
import {Match} from "./match";

@Injectable({
  providedIn: "root"
})
export class CreateMatchWS {

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
      profile: data.referee
    }
  }

  execute(match: Match): Observable<Match> {
    let url: string = Urls.getMatchesURL();
    return this.httpService.post<Match>(url, this.serialize(match));
  }

}
