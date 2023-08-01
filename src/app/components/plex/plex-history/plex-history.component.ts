import {Component} from '@angular/core';
import {PlexService} from "../../../service/plex.service";
import {PlexMediaHistory} from "../../../models/plex/plex-media-history";
import {BaseComponent} from "../../base.component";
import {ImageService} from "../../../helpers/utils/image.service";
import {SelectOption} from "../../ui/form/form-select/form-select.component";

export enum Since {
	OneDay = '1day',
	OneWeek = '1week',
	OneMonth = '1month',
}

@Component({
	selector: 'app-plex-history',
	templateUrl: './plex-history.component.html',
	styleUrls: ['./plex-history.component.scss']
})
export class PlexHistoryComponent extends BaseComponent {
	public mediasHistory: PlexMediaHistory[] = [];
	public since: SelectOption[];

	constructor(private _plexService: PlexService, private _imageService: ImageService) {
		super();

		this.since = [
			{
				id: Since.OneDay,
				label: '1 jour'
			},
			{
				id: Since.OneWeek,
				label: '1 semaine'
			},
			{
				id: Since.OneMonth,
				label: '1 mois'
			},
		];

		this.updateHistory(Since.OneDay);
	}

	public getSinceTimestamp(since: string) {
		const now = new Date();

		if(since === Since.OneDay)
			now.setDate(now.getDate() - 1);

		if(since === Since.OneWeek)
			now.setDate(now.getDate() - 7);

		if(since === Since.OneMonth)
			now.setMonth(now.getMonth() - 1);

		return now.getTime();
	}

	updateSinceFilter(selectOption: SelectOption) {
		this.updateHistory(selectOption.id);
	}

	updateHistory(since: string) {
		this._plexService.getMediaHistory(this.getSinceTimestamp(since))
			.subscribe(history => this.mediasHistory = history);
	}
}
