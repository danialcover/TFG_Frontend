import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {map, Observable} from "rxjs";
import {Match} from "./match";
import {MatchListWS} from "./match-list.WS";

@Injectable({
  providedIn: "root"
})
export class MatchGetWS {

  constructor(private httpService: HttpService) {
  }

  execute(id: number): Observable<Match> {
    let url: string = Urls.getMatchesURL() + id + '/';
    return this.httpService.get<Match>(url).pipe(
      map(match => MatchListWS.serializer(match))
    );
  }

}
