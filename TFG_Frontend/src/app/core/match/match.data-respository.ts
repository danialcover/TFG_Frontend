import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {MatchRepository} from "./match.repository";
import {Match} from "./match";
import {MatchListWS} from "./match-list.WS";
import {MatchGetWS} from "./match-get.WS";
import {ModifyMatchWS} from "./modify-match.WS";
import {MatchDeleteWS} from "./match-delete.WS";
import {CreateMatchWS} from "./create-match.WS";

@Injectable()
export class MatchDataRepository implements MatchRepository {

  constructor(private listWS: MatchListWS,
              private getWS: MatchGetWS,
              private modifyWS: ModifyMatchWS,
              private deleteWS: MatchDeleteWS,
              private createWS: CreateMatchWS) {
  }

  getGroupFilteredList(groupId: number): Observable<Match[]> {
    return this.listWS.groupFilteredExecute(groupId);
  }

  getProfileFilteredList(profileId: number): Observable<Match[]> {
    return this.listWS.profileFilteredExecute(profileId);
  }

  get(id: number): Observable<Match> {
    return this.getWS.execute(id);
  }

  modify(data: Match): Observable<Match> {
    return this.modifyWS.execute(data.id, data);
  }

  create(match: Match): Observable<Match> {
    return this.createWS.execute(match);
  }

  delete(id: number): Observable<Match> {
    return this.deleteWS.execute(id);
  }

}
