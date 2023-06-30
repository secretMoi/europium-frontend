import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
	name: 'millisToTime'
})
export class MillisToTimePipe implements PipeTransform {
	transform(milliseconds: number | null): string {
		if(!milliseconds) return '';

		const hours = Math.floor(milliseconds / 3600000).toString();
		const minutes = Math.floor((milliseconds % 3600000) / 60000).toString();

		return `${hours}h${minutes}`;
	}
}
