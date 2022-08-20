import {
	AfterContentChecked,
	AfterViewInit, ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import {TorrentInfo} from "../../models/torrent-info";
import {CleaningDataService} from "../../service/cleaning-data.service";
import {ApiType} from "../../models/enums/api-type";
import {TorrentState} from "../../models/torrent-state";

@Component({
  selector: 'app-torrent-card',
  templateUrl: './torrent-card.component.html',
  styleUrls: ['./torrent-card.component.scss']
})
export class TorrentCardComponent implements AfterContentChecked, OnInit, AfterViewInit {

	@Input() torrent!: TorrentInfo;

	@Output() deleteTorrent = new EventEmitter<TorrentInfo>();

	@ViewChild('movieCard') movieCard!: ElementRef<HTMLDivElement>;

	apiType = ApiType;
	torrentState = TorrentState;

  constructor(
		public cleaningDataService: CleaningDataService,
		private changeDetectorRef: ChangeDetectorRef,
	) { }

	ngAfterContentChecked(): void {
		// this.sampleViewModel.DataContext = this.DataContext;
		// this.sampleViewModel.Position = this.Position;
		this.changeDetectorRef.detectChanges();
    }

	ngAfterViewInit(): void {
		// this.movieCard.nativeElement.addEventListener('resize', this.onresize.bind(this));
		// this.movieCard.nativeElement.onresize?.caller(function (a: any, b: any) {
		// 	console.log(a);
		// 	console.log(b);
		// })


	}

	onresize(test: any) {
		console.log(test);
	}

  ngOnInit(): void {


		// this.movieCard.nativeElement.onresize;
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
