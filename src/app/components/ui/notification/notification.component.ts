import {Component} from '@angular/core';
import {Notification, NotificationService, NotificationType} from "./notification.service";
import {removeElement} from "../../../helpers/utils/array";
import {interval} from "rxjs";

@Component({
	selector: 'app-notification',
	templateUrl: './notification.component.html',
	styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
	private notificationsToClose : Notification[] = [];

	get canDisplayNotification() {
		return this.notifications.length > 0;
	}

	get notifications() {
		return this._notificationService.getAllNotifications();
	}

	constructor(private _notificationService: NotificationService) {
		this._notificationService.notificationPushed.subscribe(notification => this._notificationPushed(notification));
	}

	public canDisplayNotificationImage(notification: Notification) {
		console.warn(notification.type, NotificationType.Success, notification.type === NotificationType.Success);
		return !!notification.type;
	}

	public getNotificationImagePath(notification: Notification): string {
		console.warn(notification.type, NotificationType.Success, notification.type === NotificationType.Success);

		if (notification.type === NotificationType.Success) return 'assets/check.svg';
		if (notification.type === NotificationType.Error) return 'assets/cancel.svg';

		return '';
	}

	public isNotificationClosing(notification: Notification) {
		return this.notificationsToClose.indexOf(notification) != -1;
	}

	public closeNotification(notification: Notification) {
		this.notificationsToClose.push(notification);

		setTimeout(() => {
			removeElement(this.notificationsToClose, notification);
			this._notificationService.removeNotification(notification);
		}, this._notificationService.timeToRemove);
	}

	private _notificationPushed(notification: Notification) {
		if(notification.isPermanent) return;

		notification.progress$ = interval(30).subscribe(_ =>
				notification.progress = notification.progress! - 30 / (this._notificationService.stayTime - this._notificationService.timeToRemove) * 100
			);

		setTimeout(() => {
			this.notificationsToClose.push(notification);
		}, this._notificationService.stayTime - this._notificationService.timeToRemove);
	}
}
