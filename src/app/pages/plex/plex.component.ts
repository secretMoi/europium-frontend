import {Component} from '@angular/core';
import {PlexService} from "../../service/plex.service";
import {PlexDuplicate} from "../../models/plex/plex-duplicate";
import {PlexLibrary} from "../../models/plex/plex-library";
import {PlexMedia} from "../../models/plex/plex-media";
import {NotificationService} from "../../components/ui/notification/notification.service";
import {dynamicSort} from "../../helpers/utils/array";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

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

	constructor(private _plexService: PlexService, private _notificationService: NotificationService, private readonly domSanitizer: DomSanitizer,) {
		this._plexService.getLibraries().subscribe(res => {
			this.plexLibraries = res;
			this.filterLibrary = this.plexLibraries[0];
			this.selectLibrary();
		});
	}

	getThumbnail(duplicate: PlexDuplicateExtended) {
		this._plexService.getThumbnail(duplicate.parentId, duplicate.thumbnailId)
			.subscribe(data => this.createImageFromBlob(data, duplicate));
	}

	createImageFromBlob(image: Blob, duplicate: PlexDuplicateExtended) {
		let reader = new FileReader();
		reader.onloadend = () => {
			duplicate.image = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string);
		}

		reader.readAsDataURL(image);
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

			res.forEach(x => this.getThumbnail(x));

			this._executeSort();
		});
	}

	public sort(property: string) {
		this.sortOrder = this.sortProperty === property ? !this.sortOrder : false;
		this.sortProperty = property;
		this._executeSort();
		this.previousSortByProperty = this.sortProperty;
	}

	private _executeSort() {
		this.plexDuplicates = dynamicSort(this.plexDuplicates, this.sortProperty, this.sortProperty === this.previousSortByProperty && this.sortOrder);
	}
}
