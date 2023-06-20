import { Pipe, PipeTransform } from '@angular/core';
import {CleaningDataService} from "../service/cleaning-data.service";

@Pipe({
	name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {
	constructor(private _cleaningDataService: CleaningDataService) {}

	transform(value: number | null): string {
		if(!value) return '';

		const number = Number(value);

		if(number / (365 * 24 * 60 * 60) >= 1) return (number / (365 * 24 * 60 * 60)) + ' ans';
		if(number / (30 * 24 * 60 * 60) >= 1) return (number / (30 * 24 * 60 * 60)) + ' mois';
		if(number / (24 * 60 * 60) >= 1) return (number / (24 * 60 * 60)) + ' jours';
		if(number / (60 * 60) >= 1) return (number / (60 * 60)) + ' heures';
		if(number / 60 >= 1) return (number / 60) + ' minutes';

		return value + ' secondes'
	}
}
