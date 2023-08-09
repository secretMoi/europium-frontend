import {
	AfterViewInit,
	Component,
	EventEmitter, HostListener,
	Input,
	Output,
} from '@angular/core';
import {TorrentInfo} from "../../models/torrent-info";
import {CleaningDataService} from "../../service/cleaning-data.service";
import {ApiType} from "../../models/enums/api-type";
import {TorrentState} from "../../models/torrent-state";
import {Router} from "@angular/router";
import {removeAllTextAfter} from "../utils/string";
import {state} from "@angular/animations";

@Component({
  selector: 'app-torrent-card',
  templateUrl: './torrent-card.component.html',
  styleUrls: ['./torrent-card.component.scss']
})
export class TorrentCardComponent implements AfterViewInit {

	@Input() torrent!: TorrentInfo;

	@Output() deleteTorrent = new EventEmitter<TorrentInfo>();

	apiType = ApiType;
	isMetaDataModalOpen: boolean = false;
	torrentState = TorrentState;
	posterFillWidth: boolean = false;

  constructor(
		public cleaningDataService: CleaningDataService,
		public router: Router
	) {}

	ngAfterViewInit() {
		this.setPosterFillWidth();
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.setPosterFillWidth();
	}

	getModalLink(): string {
		return removeAllTextAfter(this.router.url, '#') + '#modal_' + this.torrent.hash;
	}

	displayState(state: string): string {
		if (state === TorrentState.PAUSE_UPLOAD) return 'assets/check.svg';
		if (state === TorrentState.PAUSE_DOWNLOAD) return 'assets/pause.svg';
		if (state === TorrentState.UPLOADING) return 'assets/check.svg';
		if (state === TorrentState.DOWNLOADING) return 'assets/play.svg';
		if (state === TorrentState.QUEUED_DOWNLOAD) return 'assets/pause.svg';
		if (state === TorrentState.ERROR) return 'assets/cancel.svg';
		if (state === TorrentState.MISSING_FILE) return 'assets/broken-link.svg';

		return 'assets/interrogation.svg';
	}

	onDeleteTorrent(torrent: TorrentInfo) {
		this.deleteTorrent.emit(torrent);
	}

	private setPosterFillWidth() {
		this.posterFillWidth = window.innerWidth < 1042;
	}
}
