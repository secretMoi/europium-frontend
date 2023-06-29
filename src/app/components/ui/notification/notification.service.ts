import {EventEmitter, Injectable} from "@angular/core";
import {removeElement} from "../../../helpers/utils/array";
import {Subscription} from "rxjs";

export interface Notification {
	id?: number;
	message: string;
	type?: NotificationType;
	isPermanent?: boolean;
	progress?: number;
	progress$?: Subscription;
}

export enum NotificationType {
	Success,
	Error
}

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	public notificationPushed = new EventEmitter<Notification>();

	private _notifications: Notification[] = [];
	private static count = 0;

	public get timeToRemove(): number {
		return 500;
	};

	public get stayTime(): number {
		return 5000;
	};

	public addNotification(notification: Notification) {
		this._pushNotification({id: NotificationService.count, ...notification});
	}

	public successNotification(message: string) {
		this._pushNotification({id: NotificationService.count, type: NotificationType.Success, message: message});
	}

	public errorNotification(message: string) {
		this._pushNotification({id: NotificationService.count, type: NotificationType.Error, message: message});
	}

	public addNotificationMessage(message: string) {
		this._pushNotification({id: NotificationService.count, message: message});
	}

	public getAllNotifications() {
		return this._notifications;
	}

	public removeNotification(notification: Notification) {
		notification.progress$?.unsubscribe();
		return removeElement(this._notifications, notification);
	}

	private _pushNotification(notification: Notification) {
		this._notifications.push(notification);
		NotificationService.count++;

		this.notificationPushed.emit(notification);

		if(!notification.isPermanent) {
			notification.progress = 100;

			setTimeout(() => {
				notification.progress$?.unsubscribe();

				this.removeNotification(notification);
			}, this.stayTime);
		}
	}
}
