import {Injectable} from '@angular/core';
import data from "../../config.json";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MonitoredApi} from "../models/monitored-api";

@Injectable({
  providedIn: 'root'
})
export class MonitoredApiService {

  controllerPrefix: string = data.server.host + 'monitor/apis';

  constructor(private http: HttpClient) {}

  getMonitoredApis(): Observable<MonitoredApi[]> {
    return this.http.get<MonitoredApi[]>(this.controllerPrefix);
  }
}
