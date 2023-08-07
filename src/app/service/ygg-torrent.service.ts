import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {YggTorrentAccount} from "../models/ygg-torrent-account";
import {YggTorrentSearch} from "../models/ygg-torrent-search";

@Injectable({
  providedIn: 'root'
})
export class YggTorrentService {
  constructor(private http: HttpClient) {}

  getRatio(): Observable<YggTorrentAccount> {
    return this.http.get<YggTorrentAccount>(environment.backendUrl + '/YggTorrent/ratio');
  }

  search(search: string): Observable<YggTorrentSearch[]> {
    return this.http.post<YggTorrentSearch[]>(environment.backendUrl + '/YggTorrent/search', {search});
  }
}
