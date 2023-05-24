import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatchRepository} from "../../core/match/match.repository";
import {Match} from "../../core/match/match";
import {TeamRepository} from "../../core/club/team/team.repository";
import {Team} from "../../core/club/team/team";
import {Location} from "@angular/common";
import {GroupTeamRepository} from "../../core/league/group-team/group-team.repository";
import {GroupTeam} from "../../core/league/group-team/group-team";

class MatchTeams {
  match: Match;
  team1: Team;
  team2: Team;
  groupTeam1: GroupTeam;
  groupTeam2: GroupTeam;

  constructor(match: Match, team1: Team, team2: Team, groupTeam1: GroupTeam, groupTeam2: GroupTeam) {
    this.match = match;
    this.team1 = team1;
    this.team2 = team2;
    this.groupTeam1 = groupTeam1;
    this.groupTeam2 = groupTeam2;
  }
}

@Component({
  selector: 'app-modify-match',
  templateUrl: './modify-match-result.component.html',
  styleUrls: ['./modify-match-result.component.scss']
})
export class ModifyMatchResultComponent implements OnInit {

  matchId?: number;
  team1Result?: number;
  team2Result?: number;
  match?: Match;
  teamsList?: Team[];
  groupTeamsList?: GroupTeam[];
  teamMatch?: MatchTeams;

  groupTeam1?: GroupTeam;
  groupTeam2?: GroupTeam;

  errorText: string = "S\'han d\'introduir valors correctes";
  errorMessage?: string;

  constructor(private route: ActivatedRoute,
              private matchRepo: MatchRepository,
              private teamRepo: TeamRepository,
              private groupTeamRepo: GroupTeamRepository,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.matchId = Number(this.route.snapshot.paramMap.get('id'));
    this.matchRepo.get(this.matchId).subscribe(match => {
      this.match = match;
      this.groupTeamRepo.getList().subscribe(groupTeams => {
        this.groupTeamsList = groupTeams;
        this.teamRepo.getList().subscribe(teams => {
          this.teamsList = teams;
          this.formShowData();
        });
      });
    });
  }

  formShowData() {
    this.groupTeam1 = this.groupTeamsList?.find(groupTeam => groupTeam.id == this.match!.groupTeam1);
    this.groupTeam2 = this.groupTeamsList?.find(groupTeam => groupTeam.id == this.match!.groupTeam2);
    let team1Found = this.teamsList?.find(team => team.id == this.groupTeam1!.team);
    let team2Found = this.teamsList?.find(team => team.id == this.groupTeam2!.team);
    if (team1Found && team2Found && this.groupTeam1 && this.groupTeam2) {
      this.teamMatch = new MatchTeams(this.match!, team1Found, team2Found, this.groupTeam1, this.groupTeam2);
    }
  }

  submitForm() {
    if (this.match && (this.team1Result || this.team1Result == 0) && (this.team2Result || this.team2Result == 0)) {
      let matchResult = this.checkMatchResult();
      let matchModified = new Match(this.match.id, this.match.group, this.match.matchDay, this.match.location, this.match.groupTeam1, this.match.groupTeam2, this.match.date);
      matchModified.team1Result = this.team1Result;
      matchModified.team2Result = this.team2Result;
      this.matchRepo.modify(matchModified).subscribe(match => {
        this.groupTeamRepo.modify(this.groupTeam1!, this.groupTeam2!, matchResult, this.team1Result!, this.team2Result!).subscribe();
        this.location.back();
      });
    } else {
      this.errorMessage = this.errorText;
    }
  }

  checkMatchResult(): number {
    if (this.team1Result && this.team2Result) {
      if (this.team1Result > this.team2Result) {
        return 0;
      } else {
        if (this.team1Result == this.team2Result) {
          return 1;
        } else {
          return 2;
        }
      }
    }
    return 0;
  }
}
