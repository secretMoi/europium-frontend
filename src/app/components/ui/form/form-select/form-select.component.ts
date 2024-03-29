import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface SelectOption<T = void> {
	id: string;
	label: string;
	data?: T;
}

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

	@Input() options!: SelectOption<any>[]

	@Output() optionSelected = new EventEmitter<SelectOption<any>>();

	public currentOption!: string;

	ngOnInit() {
		if(this.options.length > 0)
			this.currentOption = this.options[0].id;
	}

	onOptionSelected(optionId: string) {
		this.currentOption = optionId;
		this.optionSelected.next(this.options.find(x => x.id === optionId)!);
	}
}
