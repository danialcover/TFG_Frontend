import {GroupRepository} from "./group.repository";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Group} from "./group";
import {GroupListWS} from "./group-list.WS";
import {GroupDeleteWS} from "./group-delete.WS";

@Injectable()
export class GroupDataRepository implements GroupRepository {

  constructor(private listWS: GroupListWS,
              private deleteWS: GroupDeleteWS) {
  }

  getList(): Observable<Group[]> {
    return this.listWS.execute();
  }

  delete(id: number): Observable<Group> {
    return this.deleteWS.execute(id);
  }

}
