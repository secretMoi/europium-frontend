import {Component, Input} from '@angular/core';
import {PlexMediaHistory} from "../../../models/plex/plex-media-history";
import {dateAgo, getCurrentTimestamp} from "../../../helpers/utils/date";

@Component({
  selector: 'app-plex-history-item',
  templateUrl: './plex-history-item.component.html',
  styleUrls: ['./plex-history-item.component.scss']
})
export class PlexHistoryItemComponent {

	@Input() plexMediaHistory!: PlexMediaHistory;

	constructor() {
	}

	public getMediaDataTags() {
		return [
			{label: 'User', value: this.plexMediaHistory.userId},
			{label: 'Type', value: this.plexMediaHistory.mediaType},
			{label: 'Il y a', value: dateAgo(getCurrentTimestamp() - this.plexMediaHistory.seenAt)},
		];
	}

}
