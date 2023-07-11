import { Pipe, PipeTransform } from '@angular/core';
import {CleaningDataService} from "../service/cleaning-data.service";
import {dateAgo} from "../helpers/utils/date";

@Pipe({
	name: 'dateAgo'
})
export class DateAgoPipe implements PipeTransform {
	constructor(private _cleaningDataService: CleaningDataService) {}

	transform(value: number | null): string {
		return dateAgo(value);
	}
}
