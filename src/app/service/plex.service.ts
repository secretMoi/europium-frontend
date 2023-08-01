import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {PlexDuplicate} from "../models/plex/plex-duplicate";
import {PlexLibrary} from "../models/plex/plex-library";
import {PlexPlayingMedia} from "../models/plex/plex-playing-medias";
import {PlexMediaHistory} from "../models/plex/plex-media-history";
import {PlexPictureParameters} from "../models/plex/plex-picture-parameters";
import {HttpCacheService} from "./http-cache.service";
import {ImageService} from "../helpers/utils/image.service";

@Injectable({
	providedIn: 'root'
})
export class PlexService {
	constructor(private http: HttpClient, private httpCacheService: HttpCacheService, private imageService: ImageService) {
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
		if (plexPictureParameters.media.parentId === 0 || plexPictureParameters.media.thumbnailId === 0) return of();

		let params = new HttpParams();

		if(plexPictureParameters.media.parentId) params = params.append('parentId', plexPictureParameters.media.parentId)
		if(plexPictureParameters.media.thumbnailId) params = params.append('thumbnailId', plexPictureParameters.media.thumbnailId);
		if(plexPictureParameters.size) params = params.append('size', plexPictureParameters.size);
		if(plexPictureParameters.isArt === true) params = params.append('isArt', plexPictureParameters.isArt);

		return this.httpCacheService.get(
			environment.backendUrl + `/plex/thumbnail`,
			{ params: params, responseType: 'blob' }
		)
			.pipe(tap(
				x => this.imageService.createImageFromBlob(x, plexPictureParameters.media)
			))
		// 	.pipe(map(
		// 	async data => plexPictureParameters.media.image = await this.imageService.blobToBase64(data)
		// ))
			;
	}

	restart() {
		return this.http.get(environment.backendUrl + `/plex/restart`);
	}

	getPlayingMedias() {
		return this.http.get<PlexPlayingMedia[]>(environment.backendUrl + `/plex/medias/playing`);
	}

	getMediaHistory(since: number) {
		return this.http.get<PlexMediaHistory[]>(environment.backendUrl + `/plex/medias/history?since=${Math.trunc(since / 1000)}`);
	}
}
