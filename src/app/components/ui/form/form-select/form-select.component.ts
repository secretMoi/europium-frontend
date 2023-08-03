import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

export interface SelectOption {
	id: string;
	label: string;
}

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

	@Input() options!: SelectOption[]

	@Output() optionSelected = new EventEmitter<SelectOption>();

	public currentOption!: string;

	ngOnInit() {
		console.warn(this.options);
		if(this.options.length > 0)
			this.currentOption = this.options[0].id;
	}

	onOptionSelected(optionId: string) {
		this.currentOption = optionId;
		this.optionSelected.next(this.options.find(x => x.id === optionId)!);
	}
}
