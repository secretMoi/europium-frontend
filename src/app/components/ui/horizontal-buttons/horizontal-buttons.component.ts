import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'app-horizontal-buttons',
  templateUrl: './horizontal-buttons.component.html',
  styleUrls: ['./horizontal-buttons.component.scss']
})
export class HorizontalButtonsComponent extends BaseComponent implements OnInit {
	@Input() buttons!: {image: string; id: number}[];

	@Output() onButtonClicked = new EventEmitter<number>();

	private activeButton: number = 0;

	buttonClicked(button: { image: string; id: number }) {
		this.activeButton = button.id;
		this.onButtonClicked.emit(button.id);
	}

	public isButtonActive(button: {id: number}) {
		return button.id === this.activeButton;
	}

	ngOnInit() {
		this.buttonClicked(this.buttons[0]);
	}
}
