import {Injectable} from '@angular/core';
import data from "../../config.json";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MonitoredApi} from "../models/monitored-api";

@Injectable({
  providedIn: 'root'
})
export class MonitoredApiService {

  controllerPrefix: string = data.server.host + '/monitor';

  constructor(private http: HttpClient) {}

  getMonitoredApis(): Observable<MonitoredApi[]> {
    return this.http.get<MonitoredApi[]>(this.controllerPrefix + '/apis');
  }

  getApiLogo(apiCode: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');


    return this.http.get(this.controllerPrefix + `/${apiCode}/logo`,  { headers, responseType: 'text'});
  }
}
