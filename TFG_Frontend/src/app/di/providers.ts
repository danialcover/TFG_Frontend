import {LeagueRepository} from "../core/league/league.repository";
import {LeagueDataRepository} from "../core/league/league.data-respository";
import {GroupRepository} from "../core/league/group/group.repository";
import {GroupDataRepository} from "../core/league/group/group.data-respository";
import {TeamRepository} from "../core/club/team/team.repository";
import {TeamDataRepository} from "../core/club/team/team.data-respository";
import {ClubRepository} from "../core/club/club.repository";
import {ClubDataRepository} from "../core/club/club.data-respository";

export const AppProviders = [
  {provide: LeagueRepository, useClass: LeagueDataRepository},
  {provide: GroupRepository, useClass: GroupDataRepository},
  {provide: TeamRepository, useClass: TeamDataRepository},
  {provide: ClubRepository, useClass: ClubDataRepository},
];
