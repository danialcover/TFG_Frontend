import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {Observable} from "rxjs";
import {Club} from "./club";

@Injectable({
  providedIn: "root"
})
export class ClubCreateWS {

  constructor(private httpService: HttpService) {
  }

  serialize(club: Club): Record<string, any> {
    return {
      name: club.name
    }
  }

  execute(club: Club): Observable<Club> {
    let url: string = Urls.getClubsURL();
    return this.httpService.post<Club>(url, this.serialize(club));
  }
}
