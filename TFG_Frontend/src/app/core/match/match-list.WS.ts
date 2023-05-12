import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {map, Observable} from "rxjs";
import {Match} from "./match";
import {GroupListWS} from "../league/group/group-list.WS";
import {TeamsListWS} from "../club/team/team-list.WS";

@Injectable({
  providedIn: "root"
})
export class MatchListWS {

  constructor(private httpService: HttpService) {
  }

  static serializer(data: any): Match {
    let match = new Match(
      data.id,
      data.group,
      data.location,
      data.team1,
      data.team2
    );
    if (data.date) {
      match.date = data.date;
    }
    if (data.user) {
      match.referee = data.user;
    }
    if (data.team1_result) {
      match.team1Result = data.team1_result;
    }
    if (data.team2_result) {
      match.team2Result = data.team2_result;
    }
    if (data.comments) {
      match.comments = data.comments;
    }
    return match;
  }

  execute(): Observable<Match[]> {
    return this.httpService.get<Match[]>(Urls.getMatchesURL()).pipe(
      map(matches => matches.map(match => MatchListWS.serializer(match))));
  }
}
