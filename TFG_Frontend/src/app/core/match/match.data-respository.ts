import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {MatchRepository} from "./match.repository";
import {Match} from "./match";
import {MatchListWS} from "./match-list.WS";

@Injectable()
export class MatchDataRepository implements MatchRepository {

  constructor(private listWS: MatchListWS) {
  }

  getList(): Observable<Match[]> {
    return this.listWS.execute();
  }
}
