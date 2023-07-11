import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {PlexDuplicate} from "../models/plex/plex-duplicate";
import {PlexLibrary} from "../models/plex/plex-library";
import {PlexPlayingMedia} from "../models/plex/plex-playing-medias";
import {PlexMediaHistory} from "../models/plex/plex-media-history";

@Injectable({
	providedIn: 'root'
})
export class PlexService {
	constructor(private http: HttpClient) {
	}

	getDuplicates(library: PlexLibrary): Observable<PlexDuplicate[]> {
		return this.http.get<PlexDuplicate[]>(environment.backendUrl + `/plex/duplicates/${library.type}/${library.id}`);
	}

	getLibraries(): Observable<PlexLibrary[]> {
		return this.http.get<PlexLibrary[]>(environment.backendUrl + '/plex/libraries');
	}

	deleteMedia(mediaId: number, fileId: number): Observable<boolean> {
		return this.http.delete<boolean>(environment.backendUrl + `/plex/delete/media/${mediaId}/file/${fileId}`);
	}

	getThumbnail(parentId: number, thumbnailId: number, width?: number, height?: number) {
		let params = new HttpParams();

		if(width) params = params.append('width', width);
		if(height) params = params.append('height', height);

		return this.http.get(environment.backendUrl + `/plex/thumbnail/${parentId}/${thumbnailId}`, { params: params, responseType: 'blob' });
	}

	restart() {
		return this.http.get(environment.backendUrl + `/plex/restart`);
	}

	getPlayingMedias() {
		return this.http.get<PlexPlayingMedia[]>(environment.backendUrl + `/plex/medias/playing`);
	}

	getMediaHistory() {
		return this.http.get<PlexMediaHistory[]>(environment.backendUrl + `/plex/medias/history?since=1688194009`);
	}
}
