import {Observable} from "rxjs";
import {Club} from "./club";
import {Team} from "./team/team";

export abstract class ClubRepository {
  public abstract getList(): Observable<Club[]>;
  public abstract get(id: number): Observable<Club>;
  public abstract create(club: Club): Observable<Club>;
}
