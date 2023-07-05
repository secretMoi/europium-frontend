import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MediaType} from "../../../models/ygg-torrent-search";

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent {

	@Input() sortProperty!: string;
	@Input() sortOrder!: boolean;

	@Output() onSearch = new EventEmitter<string>();
	@Output() onSort = new EventEmitter<string>();
	@Output() onSelectMediaType = new EventEmitter<MediaType>();

	public mediaType = MediaType;
	public searchText!: string;
	public filterMediaType: MediaType = MediaType.Unknown;

	get sortMenuElements() {
		return [
			{
				key: 'age',
				label: 'Age'
			},
			{
				key: 'size',
				label: 'Taille'
			},
			{
				key: 'downloaded',
				label: 'Téléchargés'
			},
			{
				key: 'seeders',
				label: 'Seeds'
			},
		]
	}

	public search() {
		this.onSearch.emit(this.searchText);
	}

	public sort(property: string) {
		this.onSort.emit(property);
	}

	public selectMediaType() {
		this.onSelectMediaType.emit(this.filterMediaType);
	}
}
