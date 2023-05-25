import {Observable} from "rxjs";
import {Location} from "./location";

export abstract class LocationRepository {
  public abstract getList(): Observable<Location[]>;
  public abstract delete(id: number): Observable<Location>;
  public abstract create(location: Location): Observable<Location>;

}
