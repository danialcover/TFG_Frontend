import {Observable} from "rxjs";
import {Team} from "./team";
import {Location} from "../location/location";

export abstract class TeamRepository {
  public abstract getList(): Observable<Team[]>;
  public abstract delete(id: number): Observable<Team>;
  public abstract create(team: Team): Observable<Team>;
}
