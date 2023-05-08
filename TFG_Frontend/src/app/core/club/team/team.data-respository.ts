import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TeamRepository} from "./team.repository";
import {Team} from "./team";
import {TeamsListWS} from "./team-list.WS";

@Injectable()
export class TeamDataRepository implements TeamRepository {

  constructor(private listWS: TeamsListWS) {
  }

  getList(): Observable<Team[]> {
    return this.listWS.execute();
  }

}
