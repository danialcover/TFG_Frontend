import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {map, Observable} from "rxjs";
import {GroupTeam} from "./group-team";

@Injectable({
  providedIn: "root"
})
export class GroupTeamListWS {

  constructor(private httpService: HttpService) {
  }

  serializer(data: any[]): GroupTeam[] {
    return data.map(item => new GroupTeam(
      item.id,
      item.group,
      item.team,
      item.points,
      item.num_matches_played,
      item.num_wins,
      item.num_draws,
      item.num_losses,
      item.goals_scored,
      item.goals_conceded,
      item.match_outcomes
    ));
  }

  execute(groupId: number): Observable<GroupTeam[]> {
    return this.httpService.get<GroupTeam[]>(Urls.getGroupTeamsURL()).pipe(
      map(data => this.serializer(data)),
      map(groupTeams => groupTeams.filter(groupTeam => groupTeam.group?.id == groupId))
    );
  }
}