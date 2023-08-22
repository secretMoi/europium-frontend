import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private accessTokenKey = 'europium_access_token';
	private refreshTokenKey = 'europium_refresh_token';

	get accessToken(): string | null {
		return localStorage.getItem(this.accessTokenKey);
	}

	get refreshToken(): string | null {
		return localStorage.getItem(this.refreshTokenKey);
	}

	constructor(private http: HttpClient, private router: Router) {}

	login(username: string, password: string): Observable<any> {
		return this.http.post(environment.backendUrl + `/auth/login`, {username, password})
			.pipe(
				tap((response: any) => {
					if (response.token)
						localStorage.setItem(this.accessTokenKey, response.token);
					if (response.refreshToken)
						localStorage.setItem(this.refreshTokenKey, response.refreshToken);
				})
			);
	}

	refreshTokens(): Observable<any> {
		const refreshToken = this.refreshToken;
		const accessToken = this.accessToken;
		if (!refreshToken) {
			// Handle error: No refresh token available
		}

		return this.http.post(environment.backendUrl + `/auth/refresh`, { accessToken, refreshToken }).pipe(
			tap((response: any) => {
				if (response.token) {
					localStorage.setItem(this.accessTokenKey, response.token);
				}
			})
		);
	}

	logout() {
		localStorage.removeItem(this.accessTokenKey);
		localStorage.removeItem(this.refreshTokenKey);

		this.router.navigate(['/login']);
	}
}
