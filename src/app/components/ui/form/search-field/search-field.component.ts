import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {
	@Input() placeHolder?: string;
	@Input() searchText: string = '';

	@Output() searchTextChange = new EventEmitter<string>();
	@Output() search = new EventEmitter<string>();

  onSearch() {
		this.search.emit(this.searchText);
  }

	textChanged(search: string) {
		this.searchTextChange.emit(search);
	}
}
