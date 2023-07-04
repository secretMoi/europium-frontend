import {Component} from '@angular/core';
import {PlexService} from "../../service/plex.service";
import {PlexDuplicate} from "../../models/plex/plex-duplicate";
import {PlexLibrary} from "../../models/plex/plex-library";
import {NotificationService} from "../../components/ui/notification/notification.service";
import {dynamicSort} from "../../helpers/utils/array";
import {SafeUrl} from "@angular/platform-browser";
import {ImageService} from "../../helpers/utils/image.service";
import {BaseComponent} from "../../components/base.component";

interface ImageBlob {
	image?: SafeUrl;
}

export type PlexDuplicateExtended = PlexDuplicate & ImageBlob;

enum SubMenus {
	Current = 'En cours',
	Duplicates = 'Doublons',
}

@Component({
	selector: 'app-plex',
	templateUrl: './plex.component.html',
	styleUrls: ['./plex.component.scss']
})
export class PlexComponent extends BaseComponent {
	public plexDuplicates: PlexDuplicateExtended[] = [];
	public plexLibraries: PlexLibrary[] = [];
	public filterLibrary: PlexLibrary | null = null;

	public sortProperty!: string;
	public sortOrder!: boolean;

	public canDisplayPlayingMedia: boolean = false;

	public currentSubMenu: SubMenus = SubMenus.Current;
	public readonly subMenus = SubMenus;

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

	get buttons() {
		return [
			{
				image: 'duplicate.svg',
				label: SubMenus.Duplicates
			},
			{
				image: 'play-theme.svg',
				label: SubMenus.Current
			}
		]
	}

	constructor(private _plexService: PlexService, private _notificationService: NotificationService, private _imageService: ImageService) {
		super();

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

	deleteMedia() {
		this.selectLibrary();
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

	subMenuSelected($event: string) {
		this.currentSubMenu = $event as SubMenus;
	}

	public setPlayingMediaVisibility(isVisible: boolean) {
		this.canDisplayPlayingMedia = isVisible;
	}

	private _executeSort() {
		this.plexDuplicates = dynamicSort(this.plexDuplicates, this.sortProperty, this.sortProperty === this.previousSortByProperty && this.sortOrder);
	}
}
