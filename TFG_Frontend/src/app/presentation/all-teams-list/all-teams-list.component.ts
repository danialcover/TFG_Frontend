import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Team} from "../../core/club/team/team";
import {TeamRepository} from "../../core/club/team/team.repository";
import {Club} from "../../core/club/club";
import {ClubRepository} from "../../core/club/club.repository";

@Component({
  selector: 'app-all-teams-list',
  templateUrl: './all-teams-list.component.html',
  styleUrls: ['./all-teams-list.component.scss']
})
export class AllTeamsListComponent implements OnInit {

  teamsList?: Team[];
  clubsList?: Club[];
  teamClubsList: TeamClub[] = [];
  showList: MatTableDataSource<TeamClub> = new MatTableDataSource<TeamClub>();
  displayedColumns: string[] = ['id', 'name', 'club Name'];
  filterTeamName = '';
  filterClubName = '';

  constructor(private teamsRepo: TeamRepository,
              private clubRepo: ClubRepository) {
  }

  ngOnInit() {
    this.teamsRepo.getList().subscribe((teams: Team[]) => {
      this.teamsList = teams;
      this.clubRepo.getList().subscribe((clubs: Club[]) => {
        this.clubsList = clubs;
        this.formShowList();
      });
    });
  }

  formShowList() {
    this.teamsList?.map((team: Team) => {
      let clubFound = this.clubsList?.find(club => club.id == team.club);
      if (clubFound) {
        this.teamClubsList.push(new TeamClub(team, clubFound));
      }
    });
    this.showList = new MatTableDataSource<TeamClub>(this.teamClubsList);
  }

  applyFilters() {
    this.showList.filterPredicate = (teamClub: TeamClub, filter: string) => {
      const filterObj = JSON.parse(filter);
      const teamNameMatch = teamClub.team.name.toLowerCase().includes(filterObj.teamName.toLowerCase());
      const clubNameMatch = teamClub.club ? teamClub.club.name.toLowerCase().includes(filterObj.clubName.toLowerCase()) : false;

      return teamNameMatch && clubNameMatch;
    };

    const filterObj = {
      teamName: this.filterTeamName,
      clubName: this.filterClubName
    };

    this.showList.filter = JSON.stringify(filterObj);
  }
}

class TeamClub {
  team: Team;
  club: Club;

  constructor(team: Team, club: Club) {
    this.team = team;
    this.club = club;
  }
}
