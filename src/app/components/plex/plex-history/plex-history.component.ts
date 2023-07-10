import {Component} from '@angular/core';
import {PlexService} from "../../../service/plex.service";
import {PlexMediaHistory} from "../../../models/plex/plex-media-history";

@Component({
  selector: 'app-plex-history',
  templateUrl: './plex-history.component.html',
  styleUrls: ['./plex-history.component.scss']
})
export class PlexHistoryComponent {
	public mediasHistory: PlexMediaHistory[] = [];

  constructor(private plexService: PlexService) {
		this.plexService.getMediaHistory().subscribe(history => this.mediasHistory = history);
	}

}
