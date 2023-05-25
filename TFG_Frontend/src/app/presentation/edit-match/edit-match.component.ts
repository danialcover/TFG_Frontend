import {Component} from '@angular/core';
import {Match} from "../../core/match/match";
import {Team} from "../../core/club/team/team";
import {GroupTeam} from "../../core/league/group-team/group-team";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchRepository} from "../../core/match/match.repository";
import {TeamRepository} from "../../core/club/team/team.repository";
import {GroupTeamRepository} from "../../core/league/group-team/group-team.repository";
import {Location} from "@angular/common";
import {ProfileRepository} from "../../core/profile/profile.repository";
import {Profile} from "../../core/profile/profile";
import {BsDatepickerConfig, BsLocaleService} from "ngx-bootstrap/datepicker";

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
  selector: 'app-edit-match',
  templateUrl: './edit-match.component.html',
  styleUrls: ['./edit-match.component.scss']
})
export class EditMatchComponent {
  matchId?: number;
  team1Result?: number;
  team2Result?: number;
  selectedReferee?: Profile;
  selectedDate = new Date();
  bsConfig?: Partial<BsDatepickerConfig>;
  match?: Match;
  teamsList?: Team[];
  groupTeamsList?: GroupTeam[];
  refereesList?: Profile[];
  teamMatch?: MatchTeams;

  groupTeam1?: GroupTeam;
  groupTeam2?: GroupTeam;
  errorText: string = "S\'han d\'introduir valors correctes";
  errorMessage?: string;

  constructor(private route: ActivatedRoute,
              private matchRepo: MatchRepository,
              private teamRepo: TeamRepository,
              private groupTeamRepo: GroupTeamRepository,
              private refereeRepo: ProfileRepository,
              private router: Router,
              private location: Location,
              private localeService: BsLocaleService) {
  }

  ngOnInit() {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-red'});
    this.localeService.use('ca');
    this.matchId = Number(this.route.snapshot.paramMap.get('id'));
    this.matchRepo.get(this.matchId).subscribe(match => {
      this.match = match;
      this.team1Result = match.team1Result;
      this.team2Result = match.team2Result;
      this.selectedDate = match.date;
      this.groupTeamRepo.getList().subscribe(groupTeams => {
        this.groupTeamsList = groupTeams;
        this.teamRepo.getList().subscribe(teams => {
          this.teamsList = teams;
          this.refereeRepo.getRefereesList().subscribe(referees => {
            this.refereesList = referees;
            this.selectedReferee = referees.find(referee => referee.id == match.referee);
            this.formShowData();
          })
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
    this.errorMessage = undefined;
    if (this.match && this.selectedDate) {
      let matchResult = this.checkMatchResult();
      let matchModified = new Match(this.match.id, this.match.group, this.match.matchDay,
        this.match.location, this.match.groupTeam1, this.match.groupTeam2, this.selectedDate, this.selectedReferee? this.selectedReferee.id: undefined);
      if (this.team1Result || this.team1Result == 0) {
      matchModified.team1Result = this.team1Result;
      matchModified.team2Result = this.team2Result;
      } else {
        matchModified.team1Result = this.match.team1Result;
        matchModified.team2Result = this.match.team2Result;
      }
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

  onSelectedReferee(newReferee: Profile) {
    this.selectedReferee = newReferee;
  }
}
