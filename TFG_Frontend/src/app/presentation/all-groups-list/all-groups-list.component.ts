import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Group} from "../../core/league/group/group";
import {GroupRepository} from "../../core/league/group/group.repository";
import {LeagueRepository} from "../../core/league/league.repository";
import {League} from "../../core/league/league";
import {Utils} from "../../core/main/utils";

@Component({
  selector: 'app-all-groups-list',
  templateUrl: './all-groups-list.component.html',
  styleUrls: ['./all-groups-list.component.scss']
})
export class AllGroupsListComponent implements OnInit {

  groupsList?: Group[];
  leaguesList?: League[];
  groupLeaguesList: GroupLeague[] = [];
  showList: MatTableDataSource<GroupLeague> = new MatTableDataSource<GroupLeague>();
  displayedColumns: string[] = ['id', 'name', 'league Name', 'year', 'buttons'];
  filterLeagueName = '';
  filterYear = '';
  availableYears: number[] = Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);

  constructor(private groupRepo: GroupRepository,
              private leagueRepo: LeagueRepository) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.groupRepo.getList().subscribe((groups: Group[]) => {
      this.groupsList = groups;
      this.leagueRepo.getList().subscribe((leagues: League[]) => {
        this.leaguesList = leagues;
        this.formShowList();
      });
    });
  }

  formShowList() {
    this.groupLeaguesList = [];
    this.showList.data = [];
    this.groupsList?.map((group: Group) => {
      let leagueFound = this.leaguesList?.find(league => league.id == group.league);
      if (leagueFound) {
        this.groupLeaguesList.push(new GroupLeague(group, leagueFound));
      }
    });
    this.showList = new MatTableDataSource<GroupLeague>(this.groupLeaguesList);
  }

  applyFilters() {
    this.showList.filterPredicate = (data: GroupLeague, _: string) => {
      const nameFilter = this.filterLeagueName ? data.league.name.toLowerCase().includes(this.filterLeagueName.trim().toLowerCase()) || false : true;
      const yearFilter = this.filterYear ? data.league.year.toString() === this.filterYear.toString() || false : true;
      return nameFilter && yearFilter;
    };
    this.showList.filter = Math.random().toString();
  }

  deleteGroup(id: number) {
    this.groupRepo.delete(id).subscribe({
      next: data => {
        this.loadData();
      }
    });
  }

  protected readonly Utils = Utils;
}

class GroupLeague {
  group: Group;
  league: League;

  constructor(group: Group, league: League) {
    this.group = group;
    this.league = league;
  }
}
