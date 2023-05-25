import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LocationRepository} from "./location.repository";
import {Location} from "./location";
import {LocationsListWS} from "./location-list.WS";
import {LocationDeleteWS} from "./location-delete.WS";

@Injectable()
export class LocationDataRespository implements LocationRepository {

  constructor(private listWS: LocationsListWS,
              private deleteWS: LocationDeleteWS) {
  }

  getList(): Observable<Location[]> {
    return this.listWS.execute();
  }

  delete(id: number): Observable<Location> {
    return this.deleteWS.execute(id);
  }
}
