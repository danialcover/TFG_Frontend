import {Component, Input, OnInit} from '@angular/core';
import {GroupTeamRepository} from "../../core/league/group-team/group-team.repository";
import {GroupTeam} from "../../core/league/group-team/group-team";
import {MatTableDataSource} from "@angular/material/table";
import {Observable, Subscription} from "rxjs";
import {Group} from "../../core/league/group/group";

@Component({
  selector: 'app-team-groups-ranking',
  templateUrl: './team-groups-ranking.component.html',
  styleUrls: ['./team-groups-ranking.component.scss']
})
export class TeamGroupsRankingComponent implements OnInit {

  @Input() group: Observable<Group | null> = new Observable<Group | null>();
  groupSubscription?: Subscription;
  groupId?: number;

  groupTeamsList: MatTableDataSource<GroupTeam> = new MatTableDataSource<GroupTeam>();
  displayedColumns: string[] = ['id', 'name', 'points', 'gamesPlayed', 'gamesWon',
    'gamesDraw', 'gamesLost', 'goalsScored', 'goalsConceded', 'lastFiveMatches'];

  constructor(private groupTeamRepo: GroupTeamRepository) {
  }

  ngOnInit(): void {
    this.groupSubscription = this.group.subscribe(group => {
      this.groupId = group!.id;
      this.groupTeamRepo.getList(this.groupId!).subscribe((groupTeams: GroupTeam[]) => {
        this.groupTeamsList = new MatTableDataSource<GroupTeam>(groupTeams);
      });
    });
  }
}
