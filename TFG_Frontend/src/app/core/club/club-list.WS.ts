import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {map, Observable} from "rxjs";
import {Club} from "./club";

@Injectable({
  providedIn: "root"
})
export class ClubsListWS {

  constructor(private httpService: HttpService) {
  }

  static serializer(item: any): Club {
    return new Club(
      item.id,
      item.name
    );
  }

  execute(): Observable<Club[]> {
    return this.httpService.get<Club[]>(Urls.getClubsURL()).pipe(
      map(clubs => clubs.map(club => ClubsListWS.serializer(club)))
    );
  }
}
