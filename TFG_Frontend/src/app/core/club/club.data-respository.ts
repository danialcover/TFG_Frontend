import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ClubRepository} from "./club.repository";
import {Club} from "./club";
import {ClubsListWS} from "./club-list.WS";
import {ClubGetWS} from "./club-get.WS";
import {Team} from "./team/team";
import {ClubCreateWS} from "./club-create.WS";

@Injectable()
export class ClubDataRepository implements ClubRepository {

  constructor(private listWS: ClubsListWS,
              private getWS: ClubGetWS,
              private createWS: ClubCreateWS) {
  }

  getList(): Observable<Club[]> {
    return this.listWS.execute();
  }

  get(id: number): Observable<Club> {
    return this.getWS.execute(id);
  }

  create(club: Club): Observable<Club> {
    return this.createWS.execute(club);
  }
}
