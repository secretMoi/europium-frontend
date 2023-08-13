import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private tokenKey = '';

	constructor(private http: HttpClient) {}

	login(username: string, password: string): Observable<any> {
		return this.http.post(environment.backendUrl + `/auth/login`, {username, password})
			.pipe(
				tap((response: any) => {
					if (response.token)
						localStorage.setItem(this.tokenKey, response.token);
				})
			);
	}

	getToken(): string | null {
		return localStorage.getItem(this.tokenKey);
	}

	logout() {
		localStorage.removeItem(this.tokenKey);
	}
}
