import {LeagueRepository} from "../core/league/league.repository";
import {LeagueDataRepository} from "../core/league/league.data-respository";
import {GroupRepository} from "../core/league/group/group.repository";
import {GroupDataRepository} from "../core/league/group/group.data-respository";
import {TeamRepository} from "../core/club/team/team.repository";
import {TeamDataRepository} from "../core/club/team/team.data-respository";

export const AppProviders = [
  {provide: LeagueRepository, useClass: LeagueDataRepository},
  {provide: GroupRepository, useClass: GroupDataRepository},
  {provide: TeamRepository, useClass: TeamDataRepository}
];
