import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TeamRepository} from "./team.repository";
import {Team} from "./team";
import {TeamsListWS} from "./team-list.WS";
import {TeamDeleteWS} from "./team-delete.WS";

@Injectable()
export class TeamDataRepository implements TeamRepository {

  constructor(private listWS: TeamsListWS,
              private deleteWS: TeamDeleteWS) {
  }

  getList(): Observable<Team[]> {
    return this.listWS.execute();
  }

  delete(id: number): Observable<Team> {
    return this.deleteWS.execute(id);
  }

}
