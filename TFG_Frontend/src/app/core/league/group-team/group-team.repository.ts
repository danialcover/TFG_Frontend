import {Observable} from "rxjs";
import {GroupTeam} from "./group-team";

export abstract class GroupTeamRepository {
  public abstract getList(groupId: number): Observable<GroupTeam[]>;
}
