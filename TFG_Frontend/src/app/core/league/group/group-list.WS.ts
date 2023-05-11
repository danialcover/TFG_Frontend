import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {map, Observable} from "rxjs";
import {Group} from "./group";

@Injectable({
  providedIn: "root"
})
export class GroupListWS {

  constructor(private httpService: HttpService) {
  }

  serializer(data: any[]): Group[] {
    return data.map(item => new Group(
      item.id,
      item.league
    ));
  }

  execute(): Observable<Group[]> {
    return this.httpService.get<Group[]>(Urls.getGroupsURL()).pipe(map(groups => this.serializer(groups)));
  }
}
