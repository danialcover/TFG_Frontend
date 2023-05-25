import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {Location} from "./location";

@Injectable({
  providedIn: "root"
})
export class LocationCreateWS {

  constructor(private httpService: HttpService) {
  }

  serialize(location: Location): Record<string, any> {
    return {
      address: location.address,
      postal_code: location.postalCode,
      city: location.city
    }
  }

  execute(location: Location): Observable<Location> {
    let url: string = Urls.getLocationsURL();
    return this.httpService.post<Location>(url, this.serialize(location));
  }
}
