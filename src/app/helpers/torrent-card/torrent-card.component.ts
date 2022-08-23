import {
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	ViewChild
} from '@angular/core';
import {TorrentInfo} from "../../models/torrent-info";
import {CleaningDataService} from "../../service/cleaning-data.service";
import {ApiType} from "../../models/enums/api-type";
import {TorrentState} from "../../models/torrent-state";
import {MonitoredApi} from "../../models/monitored-api";
import {MonitoredApiService} from "../../service/monitored-api.service";

@Component({
  selector: 'app-torrent-card',
  templateUrl: './torrent-card.component.html',
  styleUrls: ['./torrent-card.component.scss']
})
export class TorrentCardComponent {

	@Input() torrent!: TorrentInfo;

	@Output() deleteTorrent = new EventEmitter<TorrentInfo>();

	@ViewChild('movieCard') movieCard!: ElementRef<HTMLDivElement>;

	apiType = ApiType;
	torrentState = TorrentState;
	radarr!: MonitoredApi;
	sonarr!: MonitoredApi;

  constructor(
		public cleaningDataService: CleaningDataService,
		public apiService: MonitoredApiService,
	) {
		apiService.getApiByCode('RADARR').subscribe(
			api => this.radarr = api
		);

		apiService.getApiByCode('SONARR').subscribe(
			api => this.sonarr = api
		);
	}

	displayState(state: string): string {
		if (state === 'pausedUP') return 'assets/check.svg';
		if (state === 'uploading') return 'assets/check.svg';
		if (state === 'downloading') return 'assets/play.svg';
		if (state === 'error') return 'assets/cancel.svg';
		if (state === 'missingFiles') return 'assets/broken-link.svg';

		return 'assets/interrogation-mark.svg';
	}

	onDeleteTorrent(torrent: TorrentInfo) {
		this.deleteTorrent.emit(torrent);
	}
}