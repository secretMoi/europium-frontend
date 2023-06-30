import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-multiple-data-card',
  templateUrl: './multiple-data-card.component.html',
  styleUrls: ['./multiple-data-card.component.scss']
})
export class MultipleDataCardComponent {
	@Input() data: {label: string; value: string | number}[] = [];
}
