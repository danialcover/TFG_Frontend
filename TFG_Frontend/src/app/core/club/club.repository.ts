import {Observable} from "rxjs";
import {Club} from "./club";

export abstract class ClubRepository {
  public abstract getList(): Observable<Club[]>;
}
