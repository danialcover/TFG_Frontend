import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {Observable} from "rxjs";
import {League} from "./league";

@Injectable({
  providedIn: "root"
})
export class LeagueCreateWS {

  constructor(private httpService: HttpService) {
  }

  serialize(league: League): Record<string, any> {
    return {
      name: league.name,
      year: league.year
    }
  }

  execute(league: League): Observable<League> {
    let url: string = Urls.getLeaguesURL();
    return this.httpService.post<League>(url, this.serialize(league));
  }
}
