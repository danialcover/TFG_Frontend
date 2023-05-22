import {Component, Input, OnInit} from '@angular/core';
import {filter, Observable, Subscription} from "rxjs";
import {Group} from "../../core/league/group/group";
import {MatchRepository} from "../../core/match/match.repository";
import {TeamRepository} from "../../core/club/team/team.repository";
import {Team} from "../../core/club/team/team";
import {Match} from "../../core/match/match";
import {LocationRepository} from "../../core/club/location/location.repository";
import {Location} from "../../core/club/location/location";
import {ProfileRepository} from "../../core/profile/profile.repository";
import {Profile} from "../../core/profile/profile";
import {GroupTeamRepository} from "../../core/league/group-team/group-team.repository";
import {GroupTeam} from "../../core/league/group-team/group-team";

class TeamTeamMatch {
  groupTeam1: GroupTeam;
  groupTeam2: GroupTeam;
  team1: Team;
  team2: Team;
  match: Match;
  location: Location;
  referee?: Profile;

  constructor(groupTeam1: GroupTeam, groupTeam2: GroupTeam, team1: Team, team2: Team, match: Match, location: Location, referee?: Profile) {
    this.groupTeam1 = groupTeam1;
    this.groupTeam2 = groupTeam2;
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
  groupTeamsList?: GroupTeam[];
  matchesList?: Match[];
  locationsList?: Location[];
  refereesList?: Profile[];
  teamMatchList: TeamTeamMatch[] = [];
  showList: TeamTeamMatch[] = [];
  filterMatchDay: number = 1;
  matchDays: Number[] = Array.from({ length: 30 }, (_, i) => i + 1);

  constructor(private matchRepo: MatchRepository,
              private teamRepo: TeamRepository,
              private locationRepo: LocationRepository,
              private profileRepo: ProfileRepository,
              private groupTeamRepo: GroupTeamRepository) {
  }

  ngOnInit(): void {
    this.groupSubscription = this.group.subscribe(group => {
      if (group) {
        this.groupId = group!.id;
        this.teamMatchList = [];
        this.matchRepo.getGroupFilteredList(this.groupId!).subscribe((matches: Match[]) => {
          this.matchesList = matches;
          this.groupTeamRepo.getList().subscribe(groupTeams => {
            this.groupTeamsList = groupTeams;
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

        });
      }
    });
  }

  formShowList() {
    this.matchesList?.map((match: Match) => {
      let groupTeam1Found = this.groupTeamsList?.find(groupTeam => groupTeam.id == match.groupTeam1);
      let groupTeam2Found = this.groupTeamsList?.find(groupTeam => groupTeam.id == match.groupTeam2);
      let team1Found = this.teamsList?.find(team => team.id == groupTeam1Found!.team);
      let team2Found = this.teamsList?.find(team => team.id == groupTeam2Found!.team);
      let locationFound = this.locationsList?.find(location => location.id == match.location);
      if (team1Found && team2Found && locationFound && groupTeam1Found && groupTeam2Found) {
        if (match.referee) {
          let refereeFound = this.refereesList?.find(referee => referee.id == match.referee);
          this.teamMatchList.push(new TeamTeamMatch(groupTeam1Found, groupTeam2Found, team1Found, team2Found, match, locationFound, refereeFound));
        } else {
          this.teamMatchList.push(new TeamTeamMatch(groupTeam1Found, groupTeam2Found, team1Found, team2Found, match, locationFound));
        }
      }
    });
    this.showList = this.teamMatchList;
  }

  applyFilter() {
    this.showList = this.teamMatchList.filter((teamMatch: TeamTeamMatch) => teamMatch.match.matchDay == this.filterMatchDay);
  }
}
