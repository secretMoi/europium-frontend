import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface SortMenuElement {
	key: string;
	label: string;
}

@Component({
  selector: 'app-sort-menu',
  templateUrl: './sort-menu.component.html',
  styleUrls: ['./sort-menu.component.scss']
})
export class SortMenuComponent {
	@Input() elements!: SortMenuElement[];
	@Input() sortProperty!: string;
	@Input() sortOrder!: boolean;

	@Output() onElementSelected = new EventEmitter<string>();

  public elementSelected(property: string) {
		this.onElementSelected.emit(property);
	}
}
