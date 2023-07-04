import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-horizontal-buttons',
  templateUrl: './horizontal-buttons.component.html',
  styleUrls: ['./horizontal-buttons.component.scss']
})
export class HorizontalButtonsComponent {
	@Input() buttons!: {image: string; label: string}[];

	@Output() onButtonClicked = new EventEmitter<string>();

	buttonClicked(button: { image: string; label: string }) {
		this.onButtonClicked.emit(button.label);
	}

	public trackByLabel(_: any, item: { label: string }): string {
		return item.label;
	}
}
