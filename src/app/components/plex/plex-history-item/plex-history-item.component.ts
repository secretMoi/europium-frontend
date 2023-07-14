import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {PlexMediaHistory} from "../../../models/plex/plex-media-history";
import {dateAgo, getCurrentTimestamp} from "../../../helpers/utils/date";
import {getMediaTypeLabel} from "../../../mappers/media-mapper";
import {PlexService} from "../../../service/plex.service";
import {ImageService} from "../../../helpers/utils/image.service";

@Component({
  selector: 'app-plex-history-item',
  templateUrl: './plex-history-item.component.html',
  styleUrls: ['./plex-history-item.component.scss']
})
export class PlexHistoryItemComponent implements AfterViewInit {

	@Input() plexMediaHistory!: PlexMediaHistory;

	@ViewChild('item', {static: false, read: ElementRef}) children!: ElementRef;

	constructor(private _plexService: PlexService, private _imageService: ImageService) {}

	ngAfterViewInit() {
		this._getThumbnail(this.children.nativeElement.offsetWidth)
	}

	public getMediaDataTags() {
		return [
			{label: 'Utilisateur', value: this.plexMediaHistory.user},
			{label: 'Appareil', value: this.plexMediaHistory.device},
			{label: 'Type', value: getMediaTypeLabel(this.plexMediaHistory.mediaType)},
			{label: 'Il y a', value: dateAgo(getCurrentTimestamp() - this.plexMediaHistory.seenAt)},
		];
	}

	private _getThumbnail(width: number) {
		if (this.plexMediaHistory.parentId === 0 || this.plexMediaHistory.thumbnailId === 0) return;

		this._plexService.getThumbnail({
			parentId: this.plexMediaHistory.parentId,
			thumbnailId: this.plexMediaHistory.thumbnailId,
			size: width,
			isArt: true
		})
			.subscribe(data => this._imageService.createImageFromBlob(data, this.plexMediaHistory));
	}
}
