import {Observable} from "rxjs";
import {Match} from "./match";

export abstract class MatchRepository {
  public abstract getList(): Observable<Match[]>;
}
