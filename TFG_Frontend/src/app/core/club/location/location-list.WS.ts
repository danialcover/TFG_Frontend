import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {map, Observable} from "rxjs";
import {Location} from "./location";

@Injectable({
  providedIn: "root"
})
export class LocationsListWS {

  constructor(private httpService: HttpService) {
  }

  serializer(data: any): Location {
    let location = new Location();
    location.id = data.id;
    location.address = data.address;
    location.postalCode = data.postal_code;
    location.city = data.city;
    location.club = data.club;
    return location;
  }

  execute(): Observable<Location[]> {
    return this.httpService.get<Location[]>(Urls.getLocationsURL()).pipe(map((data: any[]) => data.map(item => this.serializer(item))));
  }
}
