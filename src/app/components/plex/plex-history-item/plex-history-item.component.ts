import {Component, Input} from '@angular/core';
import {PlexMediaHistory} from "../../../models/plex/plex-media-history";
import {dateAgo, getCurrentTimestamp} from "../../../helpers/utils/date";
import {getMediaTypeLabel} from "../../../mappers/media-mapper";

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
			{label: 'Utilisateur', value: this.plexMediaHistory.user},
			{label: 'Appareil', value: this.plexMediaHistory.device},
			{label: 'Type', value: getMediaTypeLabel(this.plexMediaHistory.mediaType)},
			{label: 'Il y a', value: dateAgo(getCurrentTimestamp() - this.plexMediaHistory.seenAt)},
		];
	}

}
