import {Component} from '@angular/core';
import {PlexService} from "../../service/plex.service";
import {PlexDuplicate} from "../../models/plex/plex-duplicate";
import {PlexLibrary} from "../../models/plex/plex-library";
import {PlexMedia} from "../../models/plex/plex-media";
import {NotificationService} from "../../components/ui/notification/notification.service";
import {dynamicSort} from "../../helpers/utils/array";
import {SafeUrl} from "@angular/platform-browser";
import {FormatFileSizePipe} from "../../pipes/format-file-size.pipe";
import {ImageService} from "../../helpers/utils/image.service";

interface ImageBlob {
	image?: SafeUrl;
}

type PlexDuplicateExtended = PlexDuplicate & ImageBlob;

@Component({
	selector: 'app-plex',
	templateUrl: './plex.component.html',
	styleUrls: ['./plex.component.scss']
})
export class PlexComponent {
	public plexDuplicates: PlexDuplicateExtended[] = [];
	public plexLibraries: PlexLibrary[] = [];
	public filterLibrary: PlexLibrary | null = null;

	public sortProperty!: string;
	public sortOrder!: boolean;

	public canDisplayPlayingMedia: boolean = false;

	private previousSortByProperty = '';

	get sortMenuElements() {
		return [
			{
				key: 'title',
				label: 'Titre'
			},
			{
				key: 'totalSize',
				label: 'Taille'
			},
		]
	}

	constructor(private _plexService: PlexService, private _notificationService: NotificationService, private _imageService: ImageService, private _formatFileSizePipe: FormatFileSizePipe) {
		this._plexService.getLibraries().subscribe(res => {
			this.plexLibraries = res;
			this.filterLibrary = this.plexLibraries[0];
			this.selectLibrary();
		});
	}

	getThumbnail(duplicate: PlexDuplicateExtended) {
		this._plexService.getThumbnail(duplicate.parentId, duplicate.thumbnailId)
			.subscribe(data => this._imageService.createImageFromBlob(data, duplicate));
	}

	public trackById(_: any, plexDuplicate: { id: number }): number {
		return plexDuplicate.id;
	}

	deleteMedia(media: PlexDuplicate, file: PlexMedia) {
		this._plexService.deleteMedia(media.id, file.id).subscribe({
			next: (res: boolean) => {
				if(res) {
					this.selectLibrary();
					this._notificationService.successNotification('Fichier supprimé');
				} else {
					this._notificationService.errorNotification('Impossible de supprimer le fichier');
				}
			},
			error: _ => this._notificationService.successNotification('Erreur')
		});
	}

	selectLibrary() {
		this._plexService.getDuplicates(this.filterLibrary!).subscribe(res => {
			this.plexDuplicates = res;

			res.forEach(x => this.getThumbnail(x)); // todo optimize with cache

			this._executeSort();
		});
	}

	public sort(property: string) {
		this.sortOrder = this.sortProperty === property ? !this.sortOrder : false;
		this.sortProperty = property;
		this._executeSort();
		this.previousSortByProperty = this.sortProperty;
	}

	public getMediaDataTags(media: PlexMedia) {
		return [
			{label: 'Taille', value: this._formatFileSizePipe.transform(media.size)},
			{label: 'Résolution', value: media.resolution},
			{label: 'Débit', value: media.bitrate},
			{label: 'Codec', value: media.videoCodec},
		];
	}

	public setPlayingMediaVisibility(isVisible: boolean) {
		this.canDisplayPlayingMedia = isVisible;
	}

	private _executeSort() {
		this.plexDuplicates = dynamicSort(this.plexDuplicates, this.sortProperty, this.sortProperty === this.previousSortByProperty && this.sortOrder);
	}
}
