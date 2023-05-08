import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Team} from "../../core/club/team/team";
import {TeamRepository} from "../../core/club/team/team.repository";
import {Group} from "../../core/league/group/group";
import {GroupRepository} from "../../core/league/group/group.repository";
import {League} from "../../core/league/league";
import {GroupListWS} from "../../core/league/group/group-list.WS";

@Component({
  selector: 'app-all-groups-list',
  templateUrl: './all-groups-list.component.html',
  styleUrls: ['./all-groups-list.component.scss']
})
export class AllGroupsListComponent implements OnInit {

  groupsList: MatTableDataSource<Group> = new MatTableDataSource<Group>();
  displayedColumns: string[] = ['id', 'name', 'league Name', 'year'];
  filterLeagueName = '';
  filterYear = '';
  availableYears: number[] = Array.from({length: 5}, (_, i) => new Date().getFullYear() - i);

  constructor(private groupRepo: GroupRepository) {
  }

  ngOnInit() {
    this.groupRepo.getList().subscribe((groups: Group[]) => {
      this.groupsList = new MatTableDataSource<Group>(groups);
    });
  }

  applyFilters() {
    this.groupsList.filterPredicate = (data: Group, _: string) => {
      const nameFilter = this.filterLeagueName ? data.league?.name.toLowerCase().includes(this.filterLeagueName.trim().toLowerCase()) || false : true;
      const yearFilter = this.filterYear ? data.league?.year?.toString() === this.filterYear.toString() || false : true;
      return nameFilter && yearFilter;
    };
    this.groupsList.filter = Math.random().toString();
  }
}
