import {Observable} from "rxjs";
import {Group} from "./group";

export abstract class GroupRepository {
  public abstract getList(): Observable<Group[]>;
  public abstract delete(id: number): Observable<Group>;
}
