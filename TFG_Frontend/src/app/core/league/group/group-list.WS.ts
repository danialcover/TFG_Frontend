import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {Group} from "./group";

@Injectable({
  providedIn: "root"
})
export class GroupListWS {

  constructor(private httpService: HttpService) {
  }

  execute(): Observable<Group[]> {
    return this.httpService.get<Group[]>(Urls.getGroupsURL());
  }
}
