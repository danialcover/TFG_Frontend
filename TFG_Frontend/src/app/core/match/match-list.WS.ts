import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {map, Observable} from "rxjs";
import {Match} from "./match";

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
      data.team2,
      new Date(data.date)
    );
    if (data.profile) {
      match.referee = data.profile;
    }
    if (data.team1_result !== null) {
      match.team1Result = data.team1_result;
    }
    if (data.team2_result !== null) {
      match.team2Result = data.team2_result;
    }
    if (data.comments) {
      match.comments = data.comments;
    }
    return match;
  }

  groupFilteredExecute(groupId: number): Observable<Match[]> {
    return this.httpService.get<Match[]>(Urls.getMatchesURL()).pipe(
      map(matches => matches.map(match => MatchListWS.serializer(match))),
      map(matches => matches.filter(match => match.group == groupId)),
      map(matches => matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    );
  }

  profileFilteredExecute(profileId: number): Observable<Match[]> {
    return this.httpService.get<Match[]>(Urls.getMatchesURL()).pipe(
      map(matches => matches.map(match => MatchListWS.serializer(match))),
      map(matches => matches.filter(match => match.referee == profileId)),
      map(matches => matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    );
  }
}
