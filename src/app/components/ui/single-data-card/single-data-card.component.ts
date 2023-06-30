import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-single-data-card',
  templateUrl: './single-data-card.component.html',
  styleUrls: ['./single-data-card.component.scss']
})
export class SingleDataCardComponent {
	@Input() label!: string;
	@Input() value!: string | number;
}
