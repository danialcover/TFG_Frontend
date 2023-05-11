import {Credentials} from "./credentials";
import {Observable} from "rxjs";

export abstract class ProfileRepository {
  public abstract login(data: Credentials): Observable<any>;
}
