import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {MatchRepository} from "./match.repository";
import {Match} from "./match";
import {MatchListWS} from "./match-list.WS";

@Injectable()
export class MatchDataRepository implements MatchRepository {

  constructor(private listWS: MatchListWS) {
  }

  getGroupFilteredList(groupId: number): Observable<Match[]> {
    return this.listWS.groupFilteredExecute(groupId);
  }

  getProfileFilteredList(profileId: number): Observable<Match[]> {
    return this.listWS.profileFilteredExecute(profileId);
  }
}
