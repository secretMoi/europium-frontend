import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private tokenKey = 'europium_token';
	private refreshTokenKey = 'europium_refresh_token';

	get token(): string | null {
		return localStorage.getItem(this.tokenKey);
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
						localStorage.setItem(this.tokenKey, response.token);
					if (response.refreshToken)
						localStorage.setItem(this.refreshTokenKey, response.refreshToken);
				})
			);
	}

	refreshTokens(): Observable<any> {
		const refreshToken = this.refreshToken;
		if (!refreshToken) {
			// Handle error: No refresh token available
		}

		return this.http.post(environment.backendUrl + `/auth/refresh`, { refreshToken }).pipe(
			tap((response: any) => {
				if (response.token) {
					localStorage.setItem(this.tokenKey, response.token);
				}
			})
		);
	}

	logout() {
		localStorage.removeItem(this.tokenKey);
		localStorage.removeItem(this.refreshTokenKey);

		this.router.navigate(['/login']);
	}
}
