import {Component, OnInit} from '@angular/core';
import {Team} from "../../core/club/team/team";
import {Match} from "../../core/match/match";
import {Location} from "../../core/club/location/location";
import {MatchRepository} from "../../core/match/match.repository";
import {TeamRepository} from "../../core/club/team/team.repository";
import {LocationRepository} from "../../core/club/location/location.repository";
import {LocalStorageService} from "../../core/main/local-storage-service";
import {Profile} from "../../core/profile/profile";

class refereeMatchTeam {
  team1: Team;
  team2: Team;
  match: Match;
  location: Location;

  constructor(team1: Team, team2: Team, match: Match, location: Location) {
    this.team1 = team1;
    this.team2 = team2;
    this.match = match;
    this.location = location;
  }
}

@Component({
  selector: 'app-match-referee-list',
  templateUrl: './match-referee-list.component.html',
  styleUrls: ['./match-referee-list.component.scss']
})
export class MatchRefereeListComponent implements OnInit {
  profileId?: number;

  teamsList?: Team[];
  matchesList?: Match[];
  locationsList?: Location[];
  teamMatchList: refereeMatchTeam[] = [];
  currentDate = new Date();

  profile?: Profile;

  constructor(private matchRepo: MatchRepository,
              private teamRepo: TeamRepository,
              private locationRepo: LocationRepository,
              private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    if (this.getProfile()) {
      this.matchRepo.getProfileFilteredList(this.profileId!).subscribe((matches: Match[]) => {
        this.matchesList = matches.filter(match => match.date.getTime() > Date.now());
        this.teamRepo.getList().subscribe((teams: Team[]) => {
          this.teamsList = teams;
          this.locationRepo.getList().subscribe(locations => {
            this.locationsList = locations;
            this.formShowList();
          });
        });
      });
    }
  }

  getProfile(): boolean {
    let profile = this.localStorageService.getItem('profile');
    if (profile) {
      this.profile = JSON.parse(profile);
      this.profileId = this.profile!.id;
      return true;
    }
    return false;
  }

  formShowList() {
    this.matchesList?.map((match: Match) => {
      let team1Found = this.teamsList?.find(team => team.id == match.team1);
      let team2Found = this.teamsList?.find(team => team.id == match.team2);
      let locationFound = this.locationsList?.find(location => location.id == match.location);
      if (team1Found && team2Found && locationFound) {
        this.teamMatchList.push(new refereeMatchTeam(team1Found, team2Found, match, locationFound));
      }
    });
  }
}
