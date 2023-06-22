import {Injectable} from "@angular/core";
import {removeElement} from "../../../helpers/utils/array";

export interface Notification {
	id?: number;
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
	private static count = 0;

	public addNotification(notification: Notification) {
		console.log(notification);
		this._notifications.push({id: NotificationService.count, ...notification});
		NotificationService.count++;
	}

	public addNotificationMessage(message: string) {
		this._notifications.push({id: NotificationService.count,message: message});
		NotificationService.count++;
	}

	public getAllNotifications() {
		return this._notifications;
	}

	public removeNotification(notification: Notification) {
		return removeElement(this._notifications, notification);
	}
}
