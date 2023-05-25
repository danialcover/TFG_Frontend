import {LeagueRepository} from "./league.repository";
import {Observable} from "rxjs";
import {League} from "./league";
import {LeagueListWS} from "./league-list.WS";
import {Injectable} from "@angular/core";
import {LeagueGetWS} from "./league-get.WS";
import {LeagueDeleteWS} from "./league-delete.WS";

@Injectable()
export class LeagueDataRepository implements LeagueRepository {

  constructor(private listWS: LeagueListWS,
              private getWS: LeagueGetWS,
              private deleteWS: LeagueDeleteWS) {
  }

  getList(): Observable<League[]> {
    return this.listWS.execute();
  }

  get(id: number): Observable<League> {
    return this.getWS.execute(id);
  }

  delete(id: number): Observable<League> {
    return this.deleteWS.execute(id);
  }


}
