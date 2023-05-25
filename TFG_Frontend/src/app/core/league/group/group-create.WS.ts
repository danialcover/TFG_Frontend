import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {Group} from "./group";

@Injectable({
  providedIn: "root"
})
export class GroupCreateWS {

  constructor(private httpService: HttpService) {
  }

  serialize(group: Group): Record<string, any> {
    return {
      league: group.league
    }
  }

  execute(group: Group): Observable<Group> {
    let url: string = Urls.getGroupsURL();
    return this.httpService.post<Group>(url, this.serialize(group));
  }
}
