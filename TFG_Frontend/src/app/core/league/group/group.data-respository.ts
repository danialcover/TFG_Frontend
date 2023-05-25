import {GroupRepository} from "./group.repository";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {Group} from "./group";
import {GroupListWS} from "./group-list.WS";
import {GroupDeleteWS} from "./group-delete.WS";
import {Location} from "../../club/location/location";
import {CreateGroupComponent} from "../../../presentation/create-group/create-group.component";
import {GroupCreateWS} from "./group-create.WS";

@Injectable()
export class GroupDataRepository implements GroupRepository {

  constructor(private listWS: GroupListWS,
              private deleteWS: GroupDeleteWS,
              private createWS: GroupCreateWS) {
  }

  getList(): Observable<Group[]> {
    return this.listWS.execute();
  }

  delete(id: number): Observable<Group> {
    return this.deleteWS.execute(id);
  }

  create(group: Group): Observable<Group> {
    return this.createWS.execute(group);
  }
}
