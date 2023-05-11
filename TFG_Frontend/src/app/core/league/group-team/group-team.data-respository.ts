import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {GroupTeamRepository} from "./group-team.repository";
import {GroupTeam} from "./group-team";
import {GroupTeamListWS} from "./group-team-list.WS";

@Injectable()
export class GroupTeamDataRepository implements GroupTeamRepository {

  constructor(private listWS: GroupTeamListWS) {
  }

  getList(groupId: number): Observable<GroupTeam[]> {
    return this.listWS.execute(groupId);
  }

}
