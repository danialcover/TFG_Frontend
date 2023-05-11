import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {map, Observable} from "rxjs";
import {Credentials} from "./credentials";

@Injectable({
  providedIn: "root"
})
export class LoginWS {

  constructor(private httpService: HttpService) {
  }

  execute(data: Credentials): Observable<any> {
    return this.httpService.notLoginPost<any>(Urls.getLoginURL(), data);
  }

}
