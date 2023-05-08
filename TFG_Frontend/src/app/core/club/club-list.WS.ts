import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {Observable} from "rxjs";
import {Club} from "./club";

@Injectable({
  providedIn: "root"
})
export class ClubsListWS {

  constructor(private httpService: HttpService) {
  }

  execute(): Observable<Club[]> {
    return this.httpService.get<Club[]>(Urls.getClubsURL());
  }
}
