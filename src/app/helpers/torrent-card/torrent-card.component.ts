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
import {Router} from "@angular/router";
import {NgbOffcanvas, OffcanvasDismissReasons} from "@ng-bootstrap/ng-bootstrap";

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
	canvas: boolean = false;
	closeResult = '';

  constructor(
		private offcanvasService: NgbOffcanvas,
		public cleaningDataService: CleaningDataService,
		public router: Router
	) {
	}

	getCurrenUrlWithoutAnchor(): string {
		return this.cleaningDataService.removeAllTextAfter(this.router.url, '#');
	}

	getModalLink(): string {
		return this.cleaningDataService.removeAllTextAfter(this.router.url, '#') + '#modal_' + this.torrent.hash;
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

	// open(content: any) {
	// 	this.offcanvasService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'}).result.then((result) => {
	// 		this.closeResult = `Closed with: ${result}`;
	// 	}, (reason) => {
	// 		this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
	// 	});
	// }
	//
	// private getDismissReason(reason: any): string {
	// 	if (reason === OffcanvasDismissReasons.ESC) {
	// 		return 'by pressing ESC';
	// 	} else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
	// 		return 'by clicking on the backdrop';
	// 	} else {
	// 		return `with: ${reason}`;
	// 	}
	// }
}
