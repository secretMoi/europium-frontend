import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MediaType} from "../../../models/ygg-torrent-search";
import {SelectOption} from "../../ui/form/form-select/form-select.component";

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

	public searchText!: string;

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

	get mediaTypes(): SelectOption[] {
		return [
			{
				id: MediaType.Unknown.toString(),
				label: 'Type'
			},
			{
				id: MediaType.Movie.toString(),
				label: 'Film'
			},
			{
				id: MediaType.Serie.toString(),
				label: 'Série'
			},
			{
				id: MediaType.Anime.toString(),
				label: 'Animé'
			},
		]
	}

	public search() {
		this.onSearch.emit(this.searchText);
	}

	public sort(property: string) {
		this.onSort.emit(property);
	}

	public selectMediaType(selectOption: SelectOption) {
		this.onSelectMediaType.emit(Number(selectOption));
	}
}
