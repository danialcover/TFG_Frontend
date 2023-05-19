import {Credentials} from "./credentials";
import {Observable} from "rxjs";
import {Profile} from "./profile";

export abstract class ProfileRepository {
  public abstract login(data: Credentials): Observable<any>;
  public abstract getRefereesList(): Observable<Profile[]>;
}
