import {Injectable} from "@angular/core";
import {ProfileRepository} from "./profile.repository";
import {LoginWS} from "./login.WS";
import {Credentials} from "./credentials";
import {Observable} from "rxjs";

@Injectable()
export class ProfileDataRespository implements ProfileRepository {

  constructor(private loginWS: LoginWS) {
  }

  login(data: Credentials): Observable<any> {
    return this.loginWS.execute(data);
  }


}
