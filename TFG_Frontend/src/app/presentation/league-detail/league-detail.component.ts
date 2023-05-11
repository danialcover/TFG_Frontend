import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LeagueRepository} from "../../core/league/league.repository";
import {League} from "../../core/league/league";
import {Group} from "../../core/league/group/group";
import {GroupRepository} from "../../core/league/group/group.repository";
import {BehaviorSubject, Subject} from "rxjs";

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {

  leagueId: number = 0;
  league: League = new League();
  groups: Group[] = [];
  filterGroup?: Group;
  filterGroupChange: BehaviorSubject<Group | null> = new BehaviorSubject<Group | null>(null);

  constructor(private route: ActivatedRoute,
              private leagueRepo: LeagueRepository,
              private groupRepo: GroupRepository) {
  }

  ngOnInit(): void {
    this.leagueId = Number(this.route.snapshot.paramMap.get('id'));
    this.leagueRepo.get(this.leagueId).subscribe((league: League) => {
      this.league = league;
    });
    this.groupRepo.getList().subscribe((groups: Group[]) => {
      this.groups = groups
        .filter(group => group.league?.id == this.league.id)
        .sort((group1, group2) => {
          if (group1.id === null || group2.id === null) {
            return 0;
          } else {
            return group1.id - group2.id;
          }
        });
      this.filterGroup = this.groups[0];
      this.filterGroupChange.next(this.filterGroup);
    });
  }

  onFilterGroupChange(newGroup: Group) {
    this.filterGroup = newGroup;
    this.filterGroupChange.next(this.filterGroup);
  }
}
