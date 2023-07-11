import {Component, Input} from '@angular/core';
import {MediaQuality, MediaType, YggTorrentSearch} from "../../../models/ygg-torrent-search";
import {TorrentService} from "../../../service/torrent.service";
import {NotificationService, NotificationType} from "../../ui/notification/notification.service";
import {Subject} from "rxjs";
import {getMediaTypeLabel} from "../../../mappers/media-mapper";

@Component({
  selector: 'app-ygg-torrent-card',
  templateUrl: './ygg-torrent-card.component.html',
  styleUrls: ['./ygg-torrent-card.component.scss']
})
export class YggTorrentCardComponent {

	@Input() torrent!: YggTorrentSearch;

	public askMediaType: boolean = false;
	public mediaType = MediaType;
	public filterMediaType: MediaType = MediaType.Anime;
	public closeBottomSheet$: Subject<void> = new Subject();

	constructor(private _torrentService: TorrentService, private _notificationService: NotificationService) {	}

	get getMediaType(): string {
		return getMediaTypeLabel(this.torrent.mediaType);
	}

	get mediaQuality(): string {
		if(this.torrent.mediaQuality === MediaQuality.FHD) return '1080';
		if(this.torrent.mediaQuality === MediaQuality.UHD) return '4K';
		if(this.torrent.mediaQuality === MediaQuality.HD) return '720';

		return 'Inconnu';
	}

	public askDownloadTorrent() {
		if(this.torrent.mediaType === MediaType.Anime)
			this.askMediaType = true;
		else
			this.downloadTorrent(this.torrent);
	}

	public downloadTorrent(torrent: YggTorrentSearch) {
		this._torrentService.addTorrent(this.torrent).subscribe({
			complete: () => this._notificationService.addNotification({type: NotificationType.Success, message: 'Téléchargement lancé'}),
			error: _ => this._notificationService.addNotification({type: NotificationType.Error, message: 'Impossible de lancer le téléchargement'})
		});
	}

	public onCloseBottomSheet() {
		this.askMediaType = false;
	}

	public selectMediaType() {
		this.downloadTorrent({...this.torrent, mediaType: this.filterMediaType});
		this.closeBottomSheet$.next();
	}
}
