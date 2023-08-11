import {Component} from '@angular/core';
import {PlexService} from "../../service/plex.service";
import {PlexDuplicate} from "../../models/plex/plex-duplicate";
import {PlexLibrary} from "../../models/plex/plex-library";
import {dynamicSort} from "../../helpers/utils/array";
import {SafeUrl} from "@angular/platform-browser";
import {BaseComponent} from "../../components/base.component";
import {SelectOption} from "../../components/ui/form/form-select/form-select.component";

interface ImageBlob {
	image?: SafeUrl;
}

export type PlexDuplicateExtended = PlexDuplicate & ImageBlob;

enum SubMenus {
	Current,
	Duplicates,
	History,
}

@Component({
	selector: 'app-plex',
	templateUrl: './plex.component.html',
	styleUrls: ['./plex.component.scss']
})
export class PlexComponent extends BaseComponent {
	public plexDuplicates: PlexDuplicateExtended[] = [];
	public plexLibraries: PlexLibrary[] = [];
	public currentLibraryFilter!: PlexLibrary;

	public libraries?: SelectOption<PlexLibrary>[];

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
		];
	}

	get buttons() {
		return [
			{
				image: 'duplicate.svg',
				id: SubMenus.Duplicates
			},
			{
				image: 'play-theme.svg',
				id: SubMenus.Current
			},
			{
				image: 'history.svg',
				id: SubMenus.History
			}
		];
	}

	constructor(private _plexService: PlexService) {
		super();

		this._plexService.getLibraries().subscribe(plexLibraries => {
			this.plexLibraries = plexLibraries;
			this.setLibraryFilter(plexLibraries);
			this.currentLibraryFilter = plexLibraries[0];
			this.selectLibrary();
		});
	}

	deleteMedia() {
		this.selectLibrary();
	}

	selectLibrary(library?: SelectOption<PlexLibrary>) {
		if (library) this.currentLibraryFilter = library.data!;

		this._plexService.getDuplicates(this.currentLibraryFilter!).subscribe(res => {
			this.plexDuplicates = res;
			this.executeSort();
		});
	}

	public sort(property: string) {
		this.sortOrder = this.sortProperty === property ? !this.sortOrder : false;
		this.sortProperty = property;
		this.executeSort();
		this.previousSortByProperty = this.sortProperty;
	}

	subMenuSelected($event: number) {
		this.currentSubMenu = $event as SubMenus;
	}

	public setPlayingMediaVisibility(isVisible: boolean) {
		this.canDisplayPlayingMedia = isVisible;
	}

	private executeSort() {
		this.plexDuplicates = dynamicSort(this.plexDuplicates, this.sortProperty, this.sortProperty === this.previousSortByProperty && this.sortOrder);
	}

	private setLibraryFilter(plexLibrary: PlexLibrary[]) {
		this.libraries = plexLibrary.map(library => {
			return {
				id: library.id.toString(),
				label: library.title,
				data: library
			}
		});
	}
}
