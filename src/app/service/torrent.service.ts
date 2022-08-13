import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TorrentInfo} from "../models/torrent-info";

@Injectable({
  providedIn: 'root'
})
export class TorrentService {
  constructor(private http: HttpClient) {}

  getAllTorrents(): Observable<TorrentInfo[]> {
    return this.http.get<TorrentInfo[]>(environment.backendUrl + '/torrent/list');
  }

  deleteTorrent(torrentHash: string): Observable<any> {
    return this.http.post<any>(environment.backendUrl + '/torrent/delete/' + torrentHash, null);
  }
}
