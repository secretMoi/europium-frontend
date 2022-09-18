import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CleaningDataService} from "../../service/cleaning-data.service";
import {MediaInfo} from "../../models/radarr-information";

@Component({
  selector: 'app-torrent-metadata-modal',
  templateUrl: './torrent-metadata-modal.component.html',
  styleUrls: ['./torrent-metadata-modal.component.scss']
})
export class TorrentMetadataModalComponent implements OnInit {

	@Input() isOpen!: boolean;
	@Input() metaData!: MediaInfo;
	@Input() originalName!: string;
	@Input() modalName?: string;

  constructor(
		public cleaningDataService: CleaningDataService,
		public router: Router
	) {}

  ngOnInit(): void {
  }
}
