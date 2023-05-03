import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Token c55214ed3918f5db7d35228be9a7cbe436919aef'
    });
  }

  public get<T>(url: string): Observable<T> {
    console.log('get hecho');
    return this.http.get<T>(url, {headers: this.getHeaders()});
  }

  public post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data, {headers: this.getHeaders()});
  }

  public put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data, {headers: this.getHeaders()});
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, {headers: this.getHeaders()});
  }
}
