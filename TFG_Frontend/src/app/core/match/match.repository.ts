import {Observable} from "rxjs";
import {Match} from "./match";

export abstract class MatchRepository {
  public abstract getGroupFilteredList(groupId: number): Observable<Match[]>;
  public abstract getProfileFilteredList(profileId: number): Observable<Match[]>;
  public abstract get(id: number): Observable<Match>;
  public abstract modify(data: Match): Observable<Match>;
}
