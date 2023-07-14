import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {finalize, Observable, of, share, tap} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class HttpCacheService {
	private cache = new Map<string, any>();
	private inProgress = new Map<string, Observable<any>>();

	constructor(private httpClient: HttpClient) {}

	get(url: string, options: {
		headers?: HttpHeaders | {
			[header: string]: string | string[];
		};
		params?: HttpParams | {
			[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
		};
		responseType: 'blob';
	}): Observable<any> {
		const fullUrl = url + options.params?.toString();

		if (this.cache.has(fullUrl))
			return of(this.cache.get(fullUrl));

		if (this.inProgress.has(fullUrl))
			return this.inProgress.get(fullUrl)!;

		const request = this.httpClient.get(url, options)
			.pipe(
				tap(res => this.cache.set(fullUrl, res)),
				share(),
				finalize(() => this.inProgress.delete(fullUrl))
			);
		this.inProgress.set(fullUrl, request);

		return request;
	}
}
