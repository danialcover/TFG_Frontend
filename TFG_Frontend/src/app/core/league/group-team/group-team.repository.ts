import {Observable} from "rxjs";
import {GroupTeam} from "./group-team";

export abstract class GroupTeamRepository {
  public abstract getList(groupId?: number): Observable<GroupTeam[]>;

  public abstract modify(groupTeam1: GroupTeam, groupTeam2: GroupTeam, matchResult: number,
                         team1Result: number, team2Result: number): Observable<GroupTeam>;
}
