import {GroupRepository} from "./group.repository";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Group} from "./group";
import {GroupListWS} from "./group-list.WS";

@Injectable()
export class GroupDataRepository implements GroupRepository {

  constructor(private listWS: GroupListWS) {
  }

  getList(): Observable<Group[]> {
    return this.listWS.execute();
  }

}
