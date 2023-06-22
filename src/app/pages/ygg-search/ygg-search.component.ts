import {Component} from '@angular/core';
import {YggTorrentService} from "../../service/ygg-torrent.service";
import {MediaType, YggTorrentSearch} from "../../models/ygg-torrent-search";
import {dynamicSort} from "../../helpers/utils/array";
import {NotificationService} from "../../components/ui/notification/notification.service";

@Component({
	selector: 'app-ygg-search',
	templateUrl: './ygg-search.component.html',
	styleUrls: ['./ygg-search.component.scss']
})
export class YggSearchComponent {
	public yggTorrentSearch: YggTorrentSearch[] = [];
	public sortByProperty: string = '';
	public sortOrder: boolean = false;
	public mediaType: MediaType = MediaType.Unknown;

	private previousSortByProperty = '';

	constructor(private _yggTorrentService: YggTorrentService, private _notificationService: NotificationService) {
		this._notificationService.addNotificationMessage('coucou');
		this._notificationService.addNotificationMessage('coucou');
		this._notificationService.addNotificationMessage('coucou');
	}

	public search(searchText: string) {
		this._yggTorrentService.search(searchText).subscribe(results => this.yggTorrentSearch = results);
	}

	public sortTorrents(property: string) {
		if(this.sortByProperty === property)
			this.sortOrder = !this.sortOrder;
		else
			this.sortOrder = false;

		this.sortByProperty = property;
		this.yggTorrentSearch = dynamicSort(this.yggTorrentSearch, this.sortByProperty, this.sortByProperty === this.previousSortByProperty && this.sortOrder);
		this.previousSortByProperty = this.sortByProperty;
	}

	public canDisplayTorrent(torrent: YggTorrentSearch): boolean {
		if(this.mediaType === MediaType.Unknown) return true;

		return torrent.mediaType === this.mediaType;
	}

	public changeMediaType(mediaType: MediaType) {
		this.mediaType = mediaType;
	}

	public trackByName(_: any, torrent: YggTorrentSearch): string {
		return torrent.name;
	}
}
