import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../service/auth.service";

// todo check after update
@Injectable({
	providedIn: 'root',
})
export class PermissionsService  {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): boolean {
		if (this.authService.accessToken) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}

export const AuthGuard: CanActivateFn = (): boolean => {
	return inject(PermissionsService).canActivate();
}
