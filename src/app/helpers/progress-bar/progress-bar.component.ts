import {Component, Input, OnInit} from '@angular/core';
import {TorrentInfo} from "../../models/torrent-info";
import {TorrentState} from "../../models/torrent-state";
import {CleaningDataService} from "../../service/cleaning-data.service";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

	@Input() torrent!: TorrentInfo;

	torrentState = TorrentState;

  constructor(
		public cleaningDataService: CleaningDataService
	) { }

  ngOnInit(): void {
  }

}
