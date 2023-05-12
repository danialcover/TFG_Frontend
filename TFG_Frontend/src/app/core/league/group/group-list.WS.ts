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

  static serializer(item: any): Group {
    return new Group(
      item.id,
      item.league
    );
  }

  execute(): Observable<Group[]> {
    return this.httpService.get<Group[]>(Urls.getGroupsURL()).pipe(
      map(groups => groups.map(group => GroupListWS.serializer(group))));
  }
}
