import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {TeamRepository} from "./team.repository";
import {Team} from "./team";
import {TeamsListWS} from "./team-list.WS";
import {TeamDeleteWS} from "./team-delete.WS";
import {TeamCreateWS} from "./team-create.WS";

@Injectable()
export class TeamDataRepository implements TeamRepository {

  constructor(private listWS: TeamsListWS,
              private deleteWS: TeamDeleteWS,
              private createWS: TeamCreateWS) {
  }

  getList(): Observable<Team[]> {
    return this.listWS.execute();
  }

  delete(id: number): Observable<Team> {
    return this.deleteWS.execute(id);
  }

  create(team: Team): Observable<Team> {
    return this.createWS.execute(team);
  }
}
