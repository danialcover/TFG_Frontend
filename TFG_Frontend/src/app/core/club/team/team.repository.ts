import {Observable} from "rxjs";
import {Team} from "./team";

export abstract class TeamRepository {
  public abstract getList(): Observable<Team[]>;
}
