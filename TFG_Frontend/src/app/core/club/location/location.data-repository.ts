import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LocationRepository} from "./location.repository";
import {Location} from "./location";
import {LocationsListWS} from "./location-list.WS";
import {LocationDeleteWS} from "./location-delete.WS";
import {LocationCreateWS} from "./location-create.WS";

@Injectable()
export class LocationDataRepository implements LocationRepository {

  constructor(private listWS: LocationsListWS,
              private deleteWS: LocationDeleteWS,
              private createWS: LocationCreateWS) {
  }

  getList(): Observable<Location[]> {
    return this.listWS.execute();
  }

  delete(id: number): Observable<Location> {
    return this.deleteWS.execute(id);
  }

  create(location: Location): Observable<Location> {
    return this.createWS.execute(location);
  }
}
