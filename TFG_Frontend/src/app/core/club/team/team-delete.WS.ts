import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {Team} from "./team";

@Injectable({
  providedIn: "root"
})
export class TeamDeleteWS {

  constructor(private httpService: HttpService) {
  }

  execute(id: number): Observable<Team> {
    let url: string = Urls.getTeamsURL() + id + '/';
    return this.httpService.delete<Team>(url);
  }
}
