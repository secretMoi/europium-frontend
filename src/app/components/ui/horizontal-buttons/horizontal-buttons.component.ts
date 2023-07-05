import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-horizontal-buttons',
  templateUrl: './horizontal-buttons.component.html',
  styleUrls: ['./horizontal-buttons.component.scss']
})
export class HorizontalButtonsComponent implements OnInit {
	@Input() buttons!: {image: string; label: string}[];

	@Output() onButtonClicked = new EventEmitter<string>();

	private activeButton: string = '';

	buttonClicked(button: { image: string; label: string }) {
		this.activeButton = button.label;
		this.onButtonClicked.emit(button.label);
	}

	public trackByLabel(_: any, item: { label: string }): string {
		return item.label;
	}

	public isButtonActive(button: {label: string}) {
		return button.label === this.activeButton;
	}

	ngOnInit() {
		this.buttonClicked(this.buttons[0]);
	}
}