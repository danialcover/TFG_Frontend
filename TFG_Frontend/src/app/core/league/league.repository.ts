import {Observable} from "rxjs";
import {League} from "./league";

export abstract class LeagueRepository {
  public abstract getList(): Observable<League[]>;
  public abstract get(id: number): Observable<League>;
  public abstract delete(id: number): Observable<League>;
  public abstract create(league: League): Observable<League>;

}
