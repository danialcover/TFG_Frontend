import {Injectable} from "@angular/core";
import {ProfileRepository} from "./profile.repository";
import {LoginWS} from "./login.WS";
import {Credentials} from "./credentials";
import {Observable} from "rxjs";
import {Profile} from "./profile";
import {RefereesListWS} from "./referees-list.WS";

@Injectable()
export class ProfileDataRepository implements ProfileRepository {

  constructor(private loginWS: LoginWS,
              private listWS: RefereesListWS) {
  }

  login(data: Credentials): Observable<any> {
    return this.loginWS.execute(data);
  }

  getRefereesList(): Observable<Profile[]> {
    return this.listWS.execute();
  }


}
