import {Component} from '@angular/core';
import {Notification, NotificationService, NotificationType} from "./notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
	public canDisplayNotification: boolean = true;

	get notifications() {
		return this._notificationService.getAllNotifications();
	}

  constructor(private _notificationService: NotificationService) { }

	public getNotificationImagePath(notification: Notification): string {
		if(notification.type === NotificationType.Success) return 'assets/check.svg';
		if(notification.type === NotificationType.Error) return 'assets/cancel.svg';

		return '';
	}

	public closeNotification(notification: Notification) {
		this.canDisplayNotification = !this.canDisplayNotification;
		this._notificationService.removeNotification(notification);
	}


}
