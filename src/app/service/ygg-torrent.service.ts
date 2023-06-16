import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TorrentInfo} from "../models/torrent-info";
import {YggTorrentAccount} from "../models/ygg-torrent-account";

@Injectable({
  providedIn: 'root'
})
export class YggTorrentService {
  constructor(private http: HttpClient) {}

  getRatio(): Observable<YggTorrentAccount> {
    return this.http.get<YggTorrentAccount>(environment.backendUrl + '/YggTorrent/ratio');
  }
}