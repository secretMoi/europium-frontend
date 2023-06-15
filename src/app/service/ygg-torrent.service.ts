import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TorrentInfo} from "../models/torrent-info";

@Injectable({
  providedIn: 'root'
})
export class YggTorrentService {
  constructor(private http: HttpClient) {}

  getRatio(): Observable<any> {
    return this.http.get<any>(environment.backendUrl + '/YggTorrent/ratio');
  }
}
