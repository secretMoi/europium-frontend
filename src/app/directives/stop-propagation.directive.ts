import { Directive, HostListener } from '@angular/core';

@Directive({
	selector: '[stopPropagation]',
})
export class StopPropagationDirective {
	@HostListener('click', ['$event'])
	public onClick(event: any): boolean {
		if (event) {
			event.stopPropagation();
			event.preventDefault();
		}

		return false;
	}
}
