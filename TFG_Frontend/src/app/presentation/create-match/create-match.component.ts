import {Component, OnInit} from '@angular/core';
import {TeamRepository} from "../../core/club/team/team.repository";
import {GroupTeamRepository} from "../../core/league/group-team/group-team.repository";
import {ProfileRepository} from "../../core/profile/profile.repository";
import {GroupRepository} from "../../core/league/group/group.repository";
import {LocationRepository} from "../../core/club/location/location.repository";
import {Group} from "../../core/league/group/group";
import {Team} from "../../core/club/team/team";
import {GroupTeam} from "../../core/league/group-team/group-team";
import {Location} from "../../core/club/location/location";
import {Profile} from "../../core/profile/profile";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BsDatepickerConfig, BsLocaleService} from "ngx-bootstrap/datepicker";
import {LeagueRepository} from "../../core/league/league.repository";
import {League} from "../../core/league/league";
import {Match} from "../../core/match/match";
import {MatchRepository} from "../../core/match/match.repository";
import {Location as AngularLocation} from "@angular/common";

export class GroupTeamTeam {
  team: Team;
  groupTeam: GroupTeam;

  constructor(team: Team, groupTeam: GroupTeam) {
    this.team = team;
    this.groupTeam = groupTeam;
  }
}

@Component({
  selector: 'app-create-match',
  templateUrl: './create-match.component.html',
  styleUrls: ['./create-match.component.scss']
})
export class CreateMatchComponent implements OnInit {

  groupsList?: Group[];
  groupsFilteredList?: Group[];
  leaguesList?: League[];
  teamsList?: Team[];
  groupTeamsList?: GroupTeam[];
  groupTeamsFilteredList?: GroupTeam[];
  groupTeams2List: GroupTeam[] = [];
  locationsList?: Location[];
  refereesList?: Profile[];
  groupTeamTeamList: GroupTeamTeam[] = [];
  groupTeamTeam2List: GroupTeamTeam[] = [];
  matchDays = Array.from({length: 35}, (_, i) => i + 1);

  form: FormGroup = new FormGroup<any>([]);
  bsConfig?: Partial<BsDatepickerConfig>;

  errorText: string = "S\'han d\'introduir valors correctes";
  errorMessage?: string;

  constructor(private teamRepo: TeamRepository,
              private groupTeamRepo: GroupTeamRepository,
              private refereeRepo: ProfileRepository,
              private matchRepo: MatchRepository,
              private groupRepo: GroupRepository,
              private locationRepo: LocationRepository,
              private localeService: BsLocaleService,
              private leagueRepo: LeagueRepository,
              private fb: FormBuilder,
              private location: AngularLocation) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      league: ['', Validators.required],
      group: ['', Validators.required],
      groupTeam1: ['', Validators.required],
      groupTeam2: ['', Validators.required],
      referee: ['', []],
      date: [new Date(), Validators.required],
      time: [new Date(), Validators.required],
      location: ['', Validators.required],
      matchDay: ['', Validators.required]
    });
    this.form.get('group')?.disable();
    this.form.get('groupTeam1')?.disable();
    this.form.get('groupTeam2')?.disable();
    this.bsConfig = Object.assign({}, {containerClass: 'theme-red'});
    this.localeService.use('ca');
    this.leagueRepo.getList().subscribe(leagues => {
      this.leaguesList = leagues;
      this.groupRepo.getList().subscribe(groups => {
        this.groupsList = groups;
        this.groupTeamRepo.getList().subscribe(groupTeams => {
          this.groupTeamsList = groupTeams;
          this.teamRepo.getList().subscribe(teams => {
            this.teamsList = teams;
            this.locationRepo.getList().subscribe(locations => {
              this.locationsList = locations;
              this.refereeRepo.getRefereesList().subscribe(referees => {
                this.refereesList = referees;
              })
            })
          })
        })
      });
    });
  }

  formGroupTeams() {
    this.groupTeamTeamList = [];
    this.groupTeamsFilteredList?.map(groupTeam => {
      let teamFound = this.teamsList?.find(team => team.id == groupTeam.team);
      if (teamFound) {
        this.groupTeamTeamList.push(new GroupTeamTeam(teamFound, groupTeam));
      }
    });
    this.form.get('groupTeam1')?.enable();
  }

  formGroupTeams2() {
    this.groupTeamTeam2List = [];
    this.groupTeams2List?.map(groupTeam => {
      let teamFound = this.teamsList?.find(team => team.id == groupTeam.team);
      if (teamFound) {
        this.groupTeamTeam2List.push(new GroupTeamTeam(teamFound, groupTeam));
      }
    });
    this.form.get('groupTeam2')?.enable();
  }

  leagueSelected(event: Event) {
    let leagueId = Number((event.target as HTMLSelectElement).value);
    this.groupsFilteredList = this.groupsList?.filter(group => group.league == leagueId);
    this.form.get('group')?.enable();
  }

  groupSelected(event: Event) {
    let groupId = Number((event.target as HTMLSelectElement).value);
    this.groupTeamsFilteredList = this.groupTeamsList!.filter(groupTeam => groupTeam.group == groupId);
    this.formGroupTeams();
  }

  groupTeam1Selected(event: Event) {
    let groupTeam1Id = Number((event.target as HTMLSelectElement).value);
    let group = this.form.value.group;
    let groupTeams2List = this.groupTeamsList!.filter(groupTeam => groupTeam.id != groupTeam1Id);
    this.groupTeams2List = groupTeams2List!.filter(groupTeam => groupTeam.group != group);
    this.formGroupTeams2();
  }

  //conseguir que funcione que se quite el groupTeam ya seleccionado en el 1 en el selector del 2

  submitForm() {
    let date = this.formDate();
    let match = new Match(0, this.form.value.group, this.form.value.matchDay,
      this.form.value.location, this.form.value.groupTeam1, this.form.value.groupTeam2, date, this.form.value.referee);
    this.matchRepo.create(match).subscribe({
      next: match => {
        this.location.back();
      },
      error: error => {
        this.errorMessage = this.errorText;
      }
    });
  }

  formDate(): Date {
    let date: Date = this.form.value.date;
    let time: Date = this.form.value.time;
    date.setHours(time.getHours());
    date.setMinutes(time.getMinutes());
    date.setSeconds(time.getSeconds());
    return date;
  }
}
