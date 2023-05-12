import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ClubRepository} from "./club.repository";
import {Club} from "./club";
import {ClubsListWS} from "./club-list.WS";
import {ClubGetWS} from "./club-get.WS";

@Injectable()
export class ClubDataRepository implements ClubRepository {

  constructor(private listWS: ClubsListWS,
              private getWS: ClubGetWS) {
  }

  getList(): Observable<Club[]> {
    return this.listWS.execute();
  }

  get(id: number): Observable<Club> {
    return this.getWS.execute(id);
  }

}
