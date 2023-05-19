import {Injectable} from "@angular/core";
import {Urls} from "../main/urls";
import {HttpService} from "../main/http-service";
import {map, Observable} from "rxjs";
import {Credentials} from "./credentials";
import {Profile} from "./profile";

@Injectable({
  providedIn: "root"
})
export class RefereesListWS {

  constructor(private httpService: HttpService) {
  }

  execute(): Observable<Profile[]> {
    return this.httpService.get<Profile[]>(Urls.getRefereesURL()).pipe(
      map(referees => referees.map(referee => Profile.serializer(referee))));
  }
}
