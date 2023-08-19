import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {catchError, Observable, switchMap, throwError} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.authService.token;

		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});
		}

		return next.handle(request).pipe(
			catchError(error => {
				if (error.status === 401) {
					// Token expired, try to refresh it
					return this.authService.refreshTokens().pipe(
						switchMap(() => {
							// Retry the original request with the new token
							const newToken = this.authService.token;
							if (newToken) {
								request = request.clone({
									setHeaders: {
										Authorization: `Bearer ${newToken}`,
									},
								});
								return next.handle(request);
							} else {
								// Refreshed token is also invalid, redirect to login
								this.authService.logout();
								// Redirect or handle the situation in your application
								return throwError('Refreshed token is invalid');
							}
						}),
						catchError(() => {
							// Unable to refresh token, logout user
							this.authService.logout();
							// Redirect or handle the situation in your application
							return throwError('Unable to refresh token');
						})
					);
				} else {
					return throwError(error);
				}
			})
		);
	}
}
