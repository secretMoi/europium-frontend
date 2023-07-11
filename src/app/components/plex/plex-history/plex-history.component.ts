import {Component} from '@angular/core';
import {PlexService} from "../../../service/plex.service";
import {PlexMediaHistory} from "../../../models/plex/plex-media-history";
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'app-plex-history',
  templateUrl: './plex-history.component.html',
  styleUrls: ['./plex-history.component.scss']
})
export class PlexHistoryComponent extends BaseComponent {
	public mediasHistory: PlexMediaHistory[] = [];

  constructor(private plexService: PlexService) {
		super();
		this.plexService.getMediaHistory().subscribe(history => this.mediasHistory = history);
	}

}
