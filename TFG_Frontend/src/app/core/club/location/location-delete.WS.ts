import {Injectable} from "@angular/core";
import {Urls} from "../../main/urls";
import {HttpService} from "../../main/http-service";
import {Observable} from "rxjs";
import {Location} from "./location";

@Injectable({
  providedIn: "root"
})
export class LocationDeleteWS {

  constructor(private httpService: HttpService) {
  }

  execute(id: number): Observable<Location> {
    let url: string = Urls.getLocationsURL() + id + '/';
    return this.httpService.delete<Location>(url);
  }
}
