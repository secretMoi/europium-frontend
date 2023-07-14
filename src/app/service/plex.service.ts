import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, shareReplay} from "rxjs";
import {environment} from "../../environments/environment";
import {PlexDuplicate} from "../models/plex/plex-duplicate";
import {PlexLibrary} from "../models/plex/plex-library";
import {PlexPlayingMedia} from "../models/plex/plex-playing-medias";
import {PlexMediaHistory} from "../models/plex/plex-media-history";
import {PlexPictureParameters} from "../models/plex/plex-picture-parameters";
import {HttpCacheService} from "./http-cache.service";

@Injectable({
	providedIn: 'root'
})
export class PlexService {
	constructor(private http: HttpClient, private httpCacheService: HttpCacheService) {
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

	getThumbnail(plexPictureParameters: PlexPictureParameters) {
		let params = new HttpParams();

		params = params.append('parentId', plexPictureParameters.parentId)
		if(plexPictureParameters.thumbnailId) params = params.append('thumbnailId', plexPictureParameters.thumbnailId);
		if(plexPictureParameters.size) params = params.append('size', plexPictureParameters.size);
		if(plexPictureParameters.isArt === true) params = params.append('isArt', plexPictureParameters.isArt);

		return this.httpCacheService.get(environment.backendUrl + `/plex/thumbnail`, { params: params, responseType: 'blob' });
	}

	restart() {
		return this.http.get(environment.backendUrl + `/plex/restart`);
	}

	getPlayingMedias() {
		return this.http.get<PlexPlayingMedia[]>(environment.backendUrl + `/plex/medias/playing`);
	}

	getMediaHistory() {
		// return this.http.get<PlexMediaHistory[]>(environment.backendUrl + `/plex/medias/history`);
		return this.http.get<PlexMediaHistory[]>(environment.backendUrl + `/plex/medias/history?since=1688194009`);
	}
}
