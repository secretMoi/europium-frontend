import {Injectable, Pipe, PipeTransform} from '@angular/core';
import {CleaningDataService} from "../service/cleaning-data.service";

@Pipe({
	name: 'formatFileSize'
})
@Injectable({
	providedIn: 'root'
})
export class FormatFileSizePipe implements PipeTransform {
	constructor(private _cleaningDataService: CleaningDataService) {}

	transform(value: number | null): string {
		if(!value) return '';

		return this._cleaningDataService.getSizeToDisplay(value).toString();
	}
}
