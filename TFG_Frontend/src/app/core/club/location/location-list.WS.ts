import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {map, Observable} from "rxjs";
import {Location} from "./location";
import {ClubsListWS} from "../club-list.WS";

@Injectable({
  providedIn: "root"
})
export class LocationsListWS {

  constructor(private httpService: HttpService) {
  }

  static serializer(data: any): Location {
    return new Location(
      data.id,
      data.address,
      data.postal_code,
      data.city
    );
  }

  execute(): Observable<Location[]> {
    return this.httpService.get<Location[]>(Urls.getLocationsURL()).pipe(
      map(locations => locations.map(location => LocationsListWS.serializer(location))));
  }
}
