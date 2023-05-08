import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ClubRepository} from "./club.repository";
import {Club} from "./club";
import {ClubsListWS} from "./club-list.WS";

@Injectable()
export class ClubDataRepository implements ClubRepository {

  constructor(private listWS: ClubsListWS) {
  }

  getList(): Observable<Club[]> {
    return this.listWS.execute();
  }

}
