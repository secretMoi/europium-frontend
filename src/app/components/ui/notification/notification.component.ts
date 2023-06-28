import {Component} from '@angular/core';
import {Notification, NotificationService, NotificationType} from "./notification.service";
import {removeElement} from "../../../helpers/utils/array";

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
		return !!notification.type;
	}

	public getNotificationImagePath(notification: Notification): string {
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
		setTimeout(() => {
			this.notificationsToClose.push(notification);
		}, this._notificationService.stayTime - this._notificationService.timeToRemove);
	}
}
