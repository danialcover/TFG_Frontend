import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GroupTeamRepository} from "../../core/league/group-team/group-team.repository";
import {TeamRepository} from "../../core/club/team/team.repository";
import {Observable, Subscription} from "rxjs";
import {Group} from "../../core/league/group/group";
import {MatTableDataSource} from "@angular/material/table";
import {GroupTeam} from "../../core/league/group-team/group-team";
import {Team} from "../../core/club/team/team";
import {ClubRepository} from "../../core/club/club.repository";
import {Club} from "../../core/club/club";

class GroupTeamClub {
  team: Team;
  groupTeam: GroupTeam;
  club: Club;

  constructor(team: Team, groupTeam: GroupTeam, club: Club) {
    this.team = team;
    this.groupTeam = groupTeam;
    this.club = club;
  }
}

@Component({
  selector: 'app-team-groups-list',
  templateUrl: './team-groups-list.component.html',
  styleUrls: ['./team-groups-list.component.scss']
})
export class TeamGroupsListComponent implements OnInit, OnDestroy {

  @Input() group: Observable<Group | null> = new Observable<Group | null>();
  groupSubscription?: Subscription;
  groupId?: number;

  groupTeamList?: GroupTeam[];
  teamsList?: Team[];
  clubsList?: Club[];
  groupTeamTeamList: GroupTeamClub[] = [];
  displayedColumns: string[] = ['id', 'team name', 'club name'];


  showList: MatTableDataSource<GroupTeamClub> = new MatTableDataSource<GroupTeamClub>();

  constructor(private groupTeamRepo: GroupTeamRepository,
              private teamRepo: TeamRepository,
              private clubRepo: ClubRepository) {
  }

  ngOnInit(): void {
    this.groupSubscription = this.group.subscribe(group => {
      if (group) {
        this.groupId = group!.id;
        this.showList = new MatTableDataSource<GroupTeamClub>();
        this.groupTeamTeamList = [];
        this.groupTeamRepo.getList(this.groupId!).subscribe((groupTeams: GroupTeam[]) => {
          this.groupTeamList = groupTeams;
          this.teamRepo.getList().subscribe((teams: Team[]) => {
            this.teamsList = teams;
            this.clubRepo.getList().subscribe((clubs: Club[]) => {
              this.clubsList = clubs;
              this.formShowList();
            });
          });
        });
      }

    });
  }

  formShowList() {
    this.groupTeamList?.map((groupTeam: GroupTeam) => {
      let teamFound = this.teamsList?.find(team => team.id == groupTeam.team);
      let clubFound = this.clubsList?.find(club => club.id == teamFound!.club);
      if (teamFound && clubFound) {
        this.groupTeamTeamList.push(new GroupTeamClub(teamFound, groupTeam, clubFound));
      }
    });
    this.showList = new MatTableDataSource<GroupTeamClub>(this.groupTeamTeamList);
  }


  ngOnDestroy(): void {
    this.groupSubscription?.unsubscribe();
  }
}
