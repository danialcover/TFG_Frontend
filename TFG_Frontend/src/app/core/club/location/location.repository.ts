import {Observable} from "rxjs";
import {Location} from "./location";

export abstract class LocationRepository {
  public abstract getList(): Observable<Location[]>;
}