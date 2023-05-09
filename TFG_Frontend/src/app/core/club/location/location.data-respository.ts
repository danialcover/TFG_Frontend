import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LocationRepository} from "./location.repository";
import {Location} from "./location";
import {LocationsListWS} from "./location-list.WS";

@Injectable()
export class LocationDataRespository implements LocationRepository {

  constructor(private listWS: LocationsListWS) {
  }

  getList(): Observable<Location[]> {
    return this.listWS.execute();
  }
}
