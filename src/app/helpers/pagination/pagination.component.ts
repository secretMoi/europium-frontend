import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

	page: number = 1;

	@Input() numberOfItemsPerPage!: number;
	@Input() numberOfItems!: number;

	@Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

	constructor() {
	}

	ngOnInit(): void {
	}

	onPageChanged() {
		this.pageChanged.emit(this.page);
	}

}
