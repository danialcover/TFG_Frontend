import {Injectable} from "@angular/core";
import {League} from "./league";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LeagueListWS {

  constructor(private httpService: HttpService) {
  }

  execute(): Observable<League[]> {
    return this.httpService.get<League[]>(Urls.getLeaguesURL());
  }

}
