import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {PlexDuplicate} from "../models/plex/plex-duplicate";
import {PlexLibrary} from "../models/plex/plex-library";
import {PlexPlayingMedia} from "../models/plex/plex-playing-medias";

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

	getThumbnail(parentId: number, thumbnailId: number) {
		return this.http.get(environment.backendUrl + `/plex/thumbnail/${parentId}/${thumbnailId}`, { responseType: 'blob' });
	}

	restart() {
		return this.http.get(environment.backendUrl + `/plex/restart`);
	}

	getPlayingMedias() {
		return this.http.get<PlexPlayingMedia[]>(environment.backendUrl + `/plex/medias/playing`);
	}
}
