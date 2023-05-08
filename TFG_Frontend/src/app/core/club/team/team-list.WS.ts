import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {Team} from "./team";

@Injectable({
  providedIn: "root"
})
export class TeamsListWS {

  constructor(private httpService: HttpService) {
  }

  execute(): Observable<Team[]> {
    return this.httpService.get<Team[]>(Urls.getTeamsURL());
  }
}
