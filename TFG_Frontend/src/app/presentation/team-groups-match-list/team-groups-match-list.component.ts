import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {Group} from "../../core/league/group/group";
import {MatchRepository} from "../../core/match/match.repository";
import {TeamRepository} from "../../core/club/team/team.repository";
import {Team} from "../../core/club/team/team";
import {Match} from "../../core/match/match";
import {LocationRepository} from "../../core/club/location/location.repository";
import {Location} from "../../core/club/location/location";
import {ProfileRepository} from "../../core/profile/profile.repository";
import {Profile} from "../../core/profile/profile";
import {DatePipe} from "@angular/common";

class TeamTeamMatch {
  team1: Team;
  team2: Team;
  match: Match;
  location: Location;
  referee?: Profile;

  constructor(team1: Team, team2: Team, match: Match, location: Location, referee?: Profile) {
    this.team1 = team1;
    this.team2 = team2;
    this.match = match;
    this.location = location;
    this.referee = referee;
  }
}

@Component({
  selector: 'app-team-groups-match-list',
  templateUrl: './team-groups-match-list.component.html',
  styleUrls: ['./team-groups-match-list.component.scss']
})
export class TeamGroupsMatchListComponent implements OnInit {

  @Input() group: Observable<Group | null> = new Observable<Group | null>();
  groupSubscription?: Subscription;
  groupId?: number;

  teamsList?: Team[];
  matchesList?: Match[];
  locationsList?: Location[];
  refereesList?: Profile[];
  teamMatchList: TeamTeamMatch[] = [];
  currentDate = new Date();

  constructor(private matchRepo: MatchRepository,
              private teamRepo: TeamRepository,
              private locationRepo: LocationRepository,
              private profileRepo: ProfileRepository,
              private datePipe: DatePipe) {
  }

  // Mejorar css para que se vean bien los partidos y localización y arbitro.
  // Poner unos iconos para localización y arbitro
  // Formatear bien la fecha y que se vea bien

  ngOnInit(): void {
    this.groupSubscription = this.group.subscribe(group => {
      if (group) {
        this.groupId = group!.id;
        this.teamMatchList = [];
        this.matchRepo.getGroupFilteredList(this.groupId!).subscribe((matches: Match[]) => {
          this.matchesList = matches;
          this.teamRepo.getList().subscribe((teams: Team[]) => {
            this.teamsList = teams;
            this.locationRepo.getList().subscribe(locations => {
              this.locationsList = locations;
              this.profileRepo.getRefereesList().subscribe((referees: Profile[]) => {
                this.refereesList = referees;
                this.formShowList();
              });
            });
          });
        });
      }
    });
  }

  formShowList() {
    this.matchesList?.map((match: Match) => {
      let team1Found = this.teamsList?.find(team => team.id == match.team1);
      let team2Found = this.teamsList?.find(team => team.id == match.team2);
      let locationFound = this.locationsList?.find(location => location.id == match.location);
      if (team1Found && team2Found && locationFound) {
        if (match.referee) {
          let refereeFound = this.refereesList?.find(referee => referee.id == match.referee);
          this.teamMatchList.push(new TeamTeamMatch(team1Found, team2Found, match, locationFound, refereeFound));
        } else {
          this.teamMatchList.push(new TeamTeamMatch(team1Found, team2Found, match, locationFound));
        }
      }
    });
  }
}