import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {Group} from "./group";

@Injectable({
  providedIn: "root"
})
export class GroupDeleteWS {

  constructor(private httpService: HttpService) {
  }

  execute(id: number): Observable<Group> {
    let url: string = Urls.getGroupsURL() + id + '/';
    return this.httpService.delete<Group>(url);
  }
}
