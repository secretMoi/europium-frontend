import { Component } from '@angular/core';
import {AuthService} from "../../service/auth.service";
import {NotificationService} from "../../components/ui/notification/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPage {
	username: string = '';
	password: string = '';

  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router) {}

	onSubmit() {
		console.warn(this.username, this.password);
		this.authService.login(this.username, this.password).subscribe({
			next: _ => {
				this.notificationService.successNotification('Connexion réussie');
				this.router.navigate(['/home']);
			},
			error: _ => this.notificationService.errorNotification('Mauvais identifiants')
		});
	}
}
