import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TorrentInfo} from "../models/torrent-info";
import {YggTorrentSearch} from "../models/ygg-torrent-search";

@Injectable({
	providedIn: 'root'
})
export class TorrentService {
	constructor(private http: HttpClient) {
	}

	getAllTorrents(): Observable<TorrentInfo[]> {
		return this.http.get<TorrentInfo[]>(environment.backendUrl + '/torrent/list');
	}

	deleteTorrent(torrentHash: string): Observable<any> {
		return this.http.post<any>(environment.backendUrl + '/torrent/delete/' + torrentHash, null);
	}

	addTorrent(torrent: YggTorrentSearch): Observable<boolean> {
		return this.http.post<boolean>(environment.backendUrl + '/torrent/add', {
			torrentId: torrent.torrentId,
			mediaType: torrent.mediaType
		});
	}
}
