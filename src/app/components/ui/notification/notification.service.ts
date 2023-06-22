import {Injectable} from "@angular/core";
import {removeElement} from "../../../helpers/utils/array";

export interface Notification {
	message: string;
	type?: NotificationType;
}

export enum NotificationType {
	Success,
	Error
}

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	private _notifications: Notification[] = [];

	public addNotification(notification: Notification) {
		this._notifications.push(notification);
	}

	public addNotificationMessage(message: string) {
		this._notifications.push({message: message});
	}

	public getAllNotifications() {
		return this._notifications;
	}

	public removeNotification(notification: Notification) {
		return removeElement(this._notifications, notification);
	}
}
