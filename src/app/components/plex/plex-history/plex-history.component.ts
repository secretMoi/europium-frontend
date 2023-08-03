import {Component} from '@angular/core';
import {PlexService} from "../../../service/plex.service";
import {PlexMediaHistory} from "../../../models/plex/plex-media-history";
import {BaseComponent} from "../../base.component";
import {SelectOption} from "../../ui/form/form-select/form-select.component";
import {getDistinctValuesByProperty} from "../../../helpers/utils/array";
import {BehaviorSubject, map} from "rxjs";

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
	public since: SelectOption[];
	public users: SelectOption[] = [];

	public mediasHistory$ = new BehaviorSubject<PlexMediaHistory[]>([]);

	private _userSelected: string = 'Utilisateur';

	get mediasFiltered$() {
		return this.mediasHistory$.pipe(map(x => x.filter(y => this._userSelected === 'Utilisateur' || y.user === this._userSelected)));
	}

	constructor(private _plexService: PlexService) {
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

	updateUserFilter(selectOption: SelectOption) {
		this._userSelected = selectOption.label;
		this.mediasHistory$.next(this.mediasHistory$.getValue());
	}

	setUsersFilter() {
		this.users = [];
		this.users.push({
			id: '',
			label: 'Utilisateur'
		});

		this.users.push(...getDistinctValuesByProperty(this.mediasHistory$.getValue(), 'user')
			.map(media => {
			return {
				id: media.id?.toString() ?? Math.random().toString(),
				label: media.user
			};
		}));
	}

	updateHistory(since: string) {
		this._plexService.getMediaHistory(this.getSinceTimestamp(since))
			.subscribe(history => {
				this.mediasHistory$.next(history);
				this.setUsersFilter();
			});
	}
}
