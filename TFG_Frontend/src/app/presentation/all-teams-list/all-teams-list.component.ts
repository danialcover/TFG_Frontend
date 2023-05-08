import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Team} from "../../core/club/team/team";
import {TeamRepository} from "../../core/club/team/team.repository";

@Component({
  selector: 'app-all-teams-list',
  templateUrl: './all-teams-list.component.html',
  styleUrls: ['./all-teams-list.component.scss']
})
export class AllTeamsListComponent implements OnInit {

  teamsList: MatTableDataSource<Team> = new MatTableDataSource<Team>();
  displayedColumns: string[] = ['id', 'name', 'club Name'];
  filterTeamName = '';
  filterClubName = '';

  constructor(private teamsRepo: TeamRepository) {
  }

  ngOnInit() {
    this.teamsRepo.getList().subscribe((teams: Team[]) => {
      this.teamsList = new MatTableDataSource<Team>(teams);
    });
  }

  applyFilters() {
    this.teamsList.filterPredicate = (team: Team, filter: string) => {
      const filterObj = JSON.parse(filter);
      const teamNameMatch = team.name.toLowerCase().includes(filterObj.teamName.toLowerCase());
      const clubNameMatch = team.club ? team.club.name.toLowerCase().includes(filterObj.clubName.toLowerCase()) : false;

      return teamNameMatch && clubNameMatch;
    };

    const filterObj = {
      teamName: this.filterTeamName,
      clubName: this.filterClubName
    };

    this.teamsList.filter = JSON.stringify(filterObj);
  }
}
