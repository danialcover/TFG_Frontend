import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {Team} from "./team";

@Injectable({
  providedIn: "root"
})
export class TeamCreateWS {

  constructor(private httpService: HttpService) {
  }

  serialize(team: Team): Record<string, any> {
    return {
      name: team.name,
      club: team.club
    }
  }

  execute(team: Team): Observable<Team> {
    let url: string = Urls.getTeamsURL();
    return this.httpService.post<Team>(url, this.serialize(team));
  }
}
