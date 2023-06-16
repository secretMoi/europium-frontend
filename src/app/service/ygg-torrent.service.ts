import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TorrentInfo} from "../models/torrent-info";
import {YggtorrentAccountInformation} from "../models/yggtorrent-account-information";

@Injectable({
  providedIn: 'root'
})
export class YggTorrentService {
  constructor(private http: HttpClient) {}

  getRatio(): Observable<YggtorrentAccountInformation> {
    return this.http.get<YggtorrentAccountInformation>(environment.backendUrl + '/YggTorrent/ratio');
  }
}
