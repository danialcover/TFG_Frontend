import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {Observable} from "rxjs";
import {Club} from "./club";

@Injectable({
  providedIn: "root"
})
export class ClubGetWS {

  constructor(private httpService: HttpService) {
  }

  execute(id: number): Observable<Club> {
    let url: string = Urls.getClubsURL() + id + '/';
    return this.httpService.get<Club>(url);
  }

}
