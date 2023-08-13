import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this.authService.getToken();

		if (token) {
			const authRequest = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
				},
			});

			return next.handle(authRequest);
		}

		return next.handle(request);
	}
}
