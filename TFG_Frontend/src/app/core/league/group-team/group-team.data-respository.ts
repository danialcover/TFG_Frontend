import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {GroupTeamRepository} from "./group-team.repository";
import {GroupTeam} from "./group-team";
import {GroupTeamListWS} from "./group-team-list.WS";
import {ModifyGroupTeamWS} from "./modify-group-team.WS";
import {Club} from "../../club/club";
import {GroupTeamCreateWS} from "./group-team-create.WS";

@Injectable()
export class GroupTeamDataRepository implements GroupTeamRepository {

  constructor(private listWS: GroupTeamListWS,
              private modifyWS: ModifyGroupTeamWS,
              private createWS: GroupTeamCreateWS) {
  }

  getList(groupId?: number): Observable<GroupTeam[]> {
    return this.listWS.execute(groupId);
  }

  modify(groupTeam1: GroupTeam, groupTeam2: GroupTeam, matchResult: number,
         team1Result: number, team2Result: number): Observable<GroupTeam> {
    return this.modifyWS.execute(groupTeam1, groupTeam2, matchResult, team1Result, team2Result);
  }

  create(groupTeam: GroupTeam): Observable<GroupTeam> {
    return this.createWS.execute(groupTeam);
  }
}
