import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MonitoredApi} from "../models/monitored-api";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MonitoredApiService {

  controllerPrefix: string = environment.backendUrl + '/monitor';

  constructor(private http: HttpClient) {}

  getMonitoredApis(): Observable<MonitoredApi[]> {
    return this.http.get<MonitoredApi[]>(this.controllerPrefix + '/apis');
  }

  getApiLogo(apiCode: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');


    return this.http.get(this.controllerPrefix + `/${apiCode}/logo`,  { headers, responseType: 'text'});
  }
}
