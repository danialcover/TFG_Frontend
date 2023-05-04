import {Injectable} from "@angular/core";
import {League} from "./league";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LeagueGetWS {

  constructor(private httpService: HttpService) {
  }

  execute(id: number): Observable<League> {
    let url: string = Urls.getLeaguesURL() + id + '/';
    return this.httpService.get<League>(url);
  }

}
