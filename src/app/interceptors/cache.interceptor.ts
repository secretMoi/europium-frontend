import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
	private cache: { [key: string]: HttpResponse<any> } = {};

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
		if (request.method !== 'GET' || !request.params.has('cache'))
			return next.handle(request);

		const cacheKey = request.urlWithParams;
		const cachedResponse = this.cache[cacheKey];
		if (cachedResponse)
			return of(cachedResponse.clone()); // Return cached response if available

		return next.handle(request).pipe(
			tap(event => {
				if (event instanceof HttpResponse)
					this.cache[cacheKey] = event.clone(); // Cache the response for future requests
			})
		);
	}
}
