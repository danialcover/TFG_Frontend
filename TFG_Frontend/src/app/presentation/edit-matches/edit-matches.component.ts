import {Component} from '@angular/core';
import {Team} from "../../core/club/team/team";
import {GroupTeam} from "../../core/league/group-team/group-team";
import {Match} from "../../core/match/match";
import {Location} from "../../core/club/location/location";
import {Profile} from "../../core/profile/profile";
import {MatchRepository} from "../../core/match/match.repository";
import {TeamRepository} from "../../core/club/team/team.repository";
import {LocationRepository} from "../../core/club/location/location.repository";
import {GroupTeamRepository} from "../../core/league/group-team/group-team.repository";
import {LocalStorageService} from "../../core/main/local-storage-service";
import {Group} from "../../core/league/group/group";
import {GroupRepository} from "../../core/league/group/group.repository";
import {League} from "../../core/league/league";
import {LeagueRepository} from "../../core/league/league.repository";

class MatchTeam {
  team1: Team;
  team2: Team;
  match: Match;
  location: Location;
  groupTeam1: GroupTeam;
  groupTeam2: GroupTeam;

  constructor(team1: Team, team2: Team, match: Match, location: Location, groupTeam1: GroupTeam, groupTeam2: GroupTeam) {
    this.team1 = team1;
    this.team2 = team2;
    this.match = match;
    this.location = location;
    this.groupTeam1 = groupTeam1;
    this.groupTeam2 = groupTeam2;
  }
}

@Component({
  selector: 'app-edit-matches',
  templateUrl: './edit-matches.component.html',
  styleUrls: ['./edit-matches.component.scss']
})
export class EditMatchesComponent {
  profileId?: number;

  teamsList?: Team[];
  groupTeamsList?: GroupTeam[];
  matchesList?: Match[];
  locationsList?: Location[];
  teamMatchList: MatchTeam[] = [];
  showList?: MatchTeam[];
  leagues: League[] = [];
  groups: Group[] = [];
  groupsFiltered: Group[] = [];


  profile?: Profile;

  filterGroup?: Group;
  filterLeague?: League;


  constructor(private matchRepo: MatchRepository,
              private teamRepo: TeamRepository,
              private locationRepo: LocationRepository,
              private groupTeamsRepo: GroupTeamRepository,
              private groupRepo: GroupRepository,
              private leagueRepo: LeagueRepository) {
  }

  ngOnInit(): void {
    this.leagueRepo.getList().subscribe((leagues: League[]) => {
      if (leagues.length > 0) {
        this.leagues = leagues;
        this.filterLeague = leagues[0];
        this.groupRepo.getList().subscribe((groups: Group[]) => {
          this.groups = groups;
          this.filterGroupList();
          this.filterGroup = this.groupsFiltered[0];
          this.loadMatches();
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
        this.teamMatchList.push(new MatchTeam(team1Found, team2Found, match, locationFound, groupTeam1Found, groupTeam2Found));
      }
    });
    if (this.teamMatchList.length > 0) {
      this.showList = this.teamMatchList;
    }
  }

  onFilterGroupChange(newGroup: Group) {
    this.filterGroup = newGroup;
    this.loadMatches();
  }

  onFilterLeagueChange(newLeague: League) {
    this.filterLeague = newLeague;
    this.filterGroupList();
    if (this.groupsFiltered.length > 0) {
      this.filterGroup = this.groupsFiltered[0];
    } else {
      this.filterGroup = undefined;
    }
    this.loadMatches();
  }

  filterGroupList() {
    this.groupsFiltered = this.groups
      .filter(group => group.league == this.filterLeague!.id)
      .sort((group1, group2) => {
        if (group1.id === null || group2.id === null) {
          return 0;
        } else {
          return group1.id - group2.id;
        }
      });
  }

  loadMatches() {
    this.teamMatchList = [];
    this.showList = undefined;
    if (this.filterGroup) {
      this.matchRepo.getGroupFilteredList(this.filterGroup.id).subscribe((matches: Match[]) => {
        this.matchesList = matches;
        this.teamRepo.getList().subscribe((teams: Team[]) => {
          this.teamsList = teams;
          this.groupTeamsRepo.getList().subscribe(groupTeams => {
            this.groupTeamsList = groupTeams;
            this.locationRepo.getList().subscribe(locations => {
              this.locationsList = locations;
              this.formShowList();
            });
          });
        });
      });
    }

  }

  deleteMatch(matchId: number) {
    this.matchRepo.delete(matchId).subscribe({
      next: data => {
        this.loadMatches();
      }
    });
  }
}
