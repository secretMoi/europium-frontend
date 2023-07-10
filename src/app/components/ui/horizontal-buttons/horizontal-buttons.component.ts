import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-horizontal-buttons',
  templateUrl: './horizontal-buttons.component.html',
  styleUrls: ['./horizontal-buttons.component.scss']
})
export class HorizontalButtonsComponent implements OnInit {
	@Input() buttons!: {image: string; id: number}[];

	@Output() onButtonClicked = new EventEmitter<number>();

	private activeButton: number = 0;

	buttonClicked(button: { image: string; id: number }) {
		this.activeButton = button.id;
		this.onButtonClicked.emit(button.id);
	}

	public trackByLabel(_: any, item: { id: number }): number {
		return item.id;
	}

	public isButtonActive(button: {id: number}) {
		return button.id === this.activeButton;
	}

	ngOnInit() {
		this.buttonClicked(this.buttons[0]);
	}
}
