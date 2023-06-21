import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MediaType} from "../../../models/ygg-torrent-search";

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.scss']
})
export class SearchFiltersComponent implements OnInit {

	public mediaType = MediaType;
	public searchText!: string;
	public filterMediaType: MediaType = MediaType.Unknown;

	@Input() sortProperty!: string;
	@Input() sortOrder!: boolean;

	@Output() onSearch = new EventEmitter<string>();
	@Output() onSort = new EventEmitter<string>();
	@Output() onSelectMediaType = new EventEmitter<MediaType>();

  constructor() { }

	public search() {
		this.onSearch.emit(this.searchText);
	}

	public sort(property: string) {
		this.onSort.emit(property);
	}

	public selectMediaType() {
		this.onSelectMediaType.emit(this.filterMediaType);
	}

  ngOnInit(): void {
  }
}
