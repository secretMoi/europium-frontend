import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Movie} from "../models/movie";

@Injectable({
	providedIn: 'root'
})
export class TheMovieDbService {
	constructor(private http: HttpClient) {}

	getMovieByName(movieName: string): Observable<Movie> {
		return this.http.get<Movie>(environment.backendUrl + '/TheMovieDb/movie/' + movieName);
	}
}
