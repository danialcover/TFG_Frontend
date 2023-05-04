import {Component, OnInit} from '@angular/core';
import {LeagueRepository} from "../../core/league/league.repository";
import {League} from "../../core/league/league";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.scss']
})
export class LeagueListComponent implements OnInit {

  leaguesList: MatTableDataSource<League> = new MatTableDataSource<League>();
  filterName?: string;
  filterYear?: string;
  displayedColumns: string[] = ['id', 'name', 'year'];
  availableYears: number[] = Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);

  constructor(private leagueRepo: LeagueRepository) {
  }

  ngOnInit() {
    this.leagueRepo.getList().subscribe((leagues: League[]) => {
      this.leaguesList = new MatTableDataSource<League>(leagues);
    });
  }

  applyFilters() {
    this.leaguesList.filterPredicate = (data: League, _: string) => {
      const nameFilter = this.filterName ? data.name.toLowerCase().includes(this.filterName.trim().toLowerCase()) : true;
      const yearFilter = this.filterYear ? data.year?.toString() === this.filterYear.toString() : true;
      return nameFilter && yearFilter;
    };
    this.leaguesList.filter = Math.random().toString();
  }


}
