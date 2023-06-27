import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {PlexDuplicate} from "../models/plex/plex-duplicate";

@Injectable({
	providedIn: 'root'
})
export class PlexService {
	constructor(private http: HttpClient) {
	}

	getDuplicates(): Observable<PlexDuplicate[]> {
		return this.http.get<PlexDuplicate[]>(environment.backendUrl + '/plex/duplicates/6');
	}
}
