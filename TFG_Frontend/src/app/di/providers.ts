import {LeagueRepository} from "../core/league/league.repository";
import {LeagueDataRepository} from "../core/league/league.data-respository";
import {GroupRepository} from "../core/league/group/group.repository";
import {GroupDataRepository} from "../core/league/group/group.data-respository";
import {TeamRepository} from "../core/club/team/team.repository";
import {TeamDataRepository} from "../core/club/team/team.data-respository";
import {ClubRepository} from "../core/club/club.repository";
import {ClubDataRepository} from "../core/club/club.data-respository";
import {LocationRepository} from "../core/club/location/location.repository";
import {LocationDataRepository} from "../core/club/location/location.data-repository";
import {ProfileDataRepository} from "../core/profile/profile.data-repository";
import {ProfileRepository} from "../core/profile/profile.repository";
import {GroupTeamDataRepository} from "../core/league/group-team/group-team.data-respository";
import {GroupTeamRepository} from "../core/league/group-team/group-team.repository";
import {MatchDataRepository} from "../core/match/match.data-respository";
import {MatchRepository} from "../core/match/match.repository";

export const AppProviders = [
  {provide: LeagueRepository, useClass: LeagueDataRepository},
  {provide: GroupRepository, useClass: GroupDataRepository},
  {provide: TeamRepository, useClass: TeamDataRepository},
  {provide: ClubRepository, useClass: ClubDataRepository},
  {provide: LocationRepository, useClass: LocationDataRepository},
  {provide: ProfileRepository, useClass: ProfileDataRepository},
  {provide: GroupTeamRepository, useClass: GroupTeamDataRepository},
  {provide: MatchRepository, useClass: MatchDataRepository}
];
