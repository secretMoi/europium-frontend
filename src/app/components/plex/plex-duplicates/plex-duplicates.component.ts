import { Component } from '@angular/core';
import {PlexService} from "../../../service/plex.service";
import {SelectOption} from "../../ui/form/form-select/form-select.component";
import {PlexLibrary} from "../../../models/plex/plex-library";
import {dynamicSort} from "../../../helpers/utils/array";
import {PlexDuplicateExtended} from "../../../pages/plex/plex.component";
import {SortMenuElement} from "../../ui/sort-menu/sort-menu.component";

@Component({
  selector: 'app-plex-duplicates',
  templateUrl: './plex-duplicates.component.html',
  styleUrls: ['./plex-duplicates.component.scss']
})
export class PlexDuplicatesComponent {
	public plexDuplicates: PlexDuplicateExtended[] = [];

	public currentLibraryFilter!: PlexLibrary;
	public libraries?: SelectOption<PlexLibrary>[];

	public sortProperty!: string;
	public sortOrder!: boolean;
	public sortMenuElements: SortMenuElement[];

	private previousSortByProperty = '';

  constructor(private _plexService: PlexService) {
		this.sortMenuElements = [
			{
				key: 'title',
				label: 'Titre'
			},
			{
				key: 'totalSize',
				label: 'Taille'
			},
		];

		this._plexService.getLibraries().subscribe(plexLibraries => {
			this.setLibraryFilter(plexLibraries);
			this.currentLibraryFilter = plexLibraries[0];
			this.selectLibrary();
		});
	}

	sort(property: string) {
		this.sortOrder = this.sortProperty === property ? !this.sortOrder : false;
		this.sortProperty = property;
		this.executeSort();
		this.previousSortByProperty = this.sortProperty;
	}

	selectLibrary(library?: SelectOption<PlexLibrary>) {
		if (library) this.currentLibraryFilter = library.data!;

		this._plexService.getDuplicates(this.currentLibraryFilter!).subscribe(res => {
			this.plexDuplicates = res;
			this.executeSort();
		});
	}

	deleteMedia() {
		this.selectLibrary();
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

	private executeSort() {
		this.plexDuplicates = dynamicSort(this.plexDuplicates, this.sortProperty, this.sortProperty === this.previousSortByProperty && this.sortOrder);
	}
}
