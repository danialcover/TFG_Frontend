import {Component, Input, OnInit} from '@angular/core';
import {GroupTeamRepository} from "../../core/league/group-team/group-team.repository";
import {GroupTeam} from "../../core/league/group-team/group-team";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subscription} from "rxjs";
import {Group} from "../../core/league/group/group";
import {Team} from "../../core/club/team/team";
import {Club} from "../../core/club/club";
import {TeamRepository} from "../../core/club/team/team.repository";

@Component({
  selector: 'app-team-groups-ranking',
  templateUrl: './team-groups-ranking.component.html',
  styleUrls: ['./team-groups-ranking.component.scss']
})
export class TeamGroupsRankingComponent implements OnInit {

  @Input() group: Observable<Group | null> = new Observable<Group | null>();
  groupSubscription?: Subscription;
  groupId?: number;

  teamsList?: Team[];
  groupTeamList?: GroupTeam[];
  groupTeamTeamList: GroupTeamTeam[] = [];
  showList: MatTableDataSource<GroupTeamTeam> = new MatTableDataSource<GroupTeamTeam>();
  displayedColumns: string[] = ['id', 'name', 'points', 'gamesPlayed', 'gamesWon',
    'gamesDraw', 'gamesLost', 'goalsScored', 'goalsConceded', 'lastFiveMatches'];

  constructor(private groupTeamRepo: GroupTeamRepository,
              private teamRepo: TeamRepository) {
  }

  ngOnInit(): void {
    this.groupSubscription = this.group.subscribe(group => {
      this.groupId = group!.id;
      this.groupTeamRepo.getList(this.groupId!).subscribe((groupTeams: GroupTeam[]) => {
        this.groupTeamList = groupTeams;
        this.teamRepo.getList().subscribe((teams: Team[]) => {
          this.teamsList = teams;
          this.formShowList();
        });
      });
    });
  }

  formShowList() {
    this.groupTeamList?.map((groupTeam: GroupTeam) => {
      let teamFound = this.teamsList?.find(team => team.id == groupTeam.team);
      if (teamFound) {
        this.groupTeamTeamList.push(new GroupTeamTeam(teamFound, groupTeam));
      }
    });
    this.showList = new MatTableDataSource<GroupTeamTeam>(this.groupTeamTeamList);
  }

}

class GroupTeamTeam {
  team: Team;
  groupTeam: GroupTeam;

  constructor(team: Team, groupTeam: GroupTeam) {
    this.team = team;
    this.groupTeam = groupTeam;
  }
}

