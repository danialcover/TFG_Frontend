import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {Team} from "./team";
import {ClubsListWS} from "../club-list.WS";

@Injectable({
  providedIn: "root"
})
export class TeamsListWS {

  constructor(private httpService: HttpService) {
  }

  static serializer(item: any): Team {
    return new Team(
      item.id,
      item.name,
      item.club
    );
  }

  execute(): Observable<Team[]> {
    return this.httpService.get<Team[]>(Urls.getTeamsURL());
  }
}
