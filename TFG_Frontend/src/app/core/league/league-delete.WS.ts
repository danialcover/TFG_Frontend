import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {Observable} from "rxjs";
import {League} from "./league";

@Injectable({
  providedIn: "root"
})
export class LeagueDeleteWS {

  constructor(private httpService: HttpService) {
  }

  execute(id: number): Observable<League> {
    let url: string = Urls.getLeaguesURL() + id + '/';
    return this.httpService.delete<League>(url);
  }
}
