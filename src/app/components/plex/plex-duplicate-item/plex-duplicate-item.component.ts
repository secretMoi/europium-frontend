import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {BaseComponent} from "../../base.component";
import {PlexDuplicateExtended} from "../../../pages/plex/plex.component";
import {PlexDuplicate} from "../../../models/plex/plex-duplicate";
import {PlexMedia} from "../../../models/plex/plex-media";
import {PlexService} from "../../../service/plex.service";
import {NotificationService} from "../../ui/notification/notification.service";
import {FormatFileSizePipe} from "../../../pipes/format-file-size.pipe";

@Component({
  selector: 'app-plex-duplicate-item',
  templateUrl: './plex-duplicate-item.component.html',
  styleUrls: ['./plex-duplicate-item.component.scss']
})
export class PlexDuplicateItemComponent extends BaseComponent implements AfterViewInit {
	@Input() plexDuplicate!: PlexDuplicateExtended;

	@Output() onDelete = new EventEmitter<void>();

	@ViewChild('item', {static: false, read: ElementRef}) duplicateChild!: ElementRef;

  constructor(private _plexService: PlexService, private _notificationService: NotificationService, private _formatFileSizePipe: FormatFileSizePipe) {
		super();
	}

	ngAfterViewInit() {
		this._plexService.getThumbnail({
				size: this.duplicateChild.nativeElement.offsetWidth,
				isArt: true,
				media: this.plexDuplicate
			}
		).subscribe();
	}

	deleteMedia(media: PlexDuplicate, file: PlexMedia) {
		this._plexService.deleteMedia(media.id, file.id).subscribe({
			next: (res: boolean) => {
				if(res) {
					this.onDelete.emit();
					this._notificationService.successNotification('Fichier supprimé');
				} else {
					this._notificationService.errorNotification('Impossible de supprimer le fichier');
				}
			},
			error: _ => this._notificationService.successNotification('Erreur')
		});
	}

	public getMediaDataTags(media: PlexMedia) {
		return [
			{label: 'Taille', value: this._formatFileSizePipe.transform(media.size)},
			{label: 'Résolution', value: media.resolution},
			{label: 'Débit', value: media.bitrate},
			{label: 'Codec', value: media.videoCodec},
		];
	}
}
