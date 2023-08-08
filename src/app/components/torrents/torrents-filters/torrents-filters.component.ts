import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TorrentState} from "../../../models/torrent-state";
import {ApiType} from "../../../models/enums/api-type";
import {SelectOption} from "../../ui/form/form-select/form-select.component";

@Component({
  selector: 'app-torrents-filters',
  templateUrl: './torrents-filters.component.html',
  styleUrls: ['./torrents-filters.component.scss']
})
export class TorrentsFiltersComponent {
	@Input() searchTorrent: string = '';

	@Output() searchTorrentChange = new EventEmitter<string>();
	@Output() apiPicked = new EventEmitter<ApiType>();
	@Output() torrentStatePicked = new EventEmitter<TorrentState>();

	apis: SelectOption[];
	torrentStates: SelectOption[];

	constructor() {
		this.apis = [
			{
				id: ApiType.ANY,
				label: 'Type'
			},
			{
				id: ApiType.RADARR,
				label: 'Film'
			},
			{
				id: ApiType.SONARR,
				label: 'Série'
			},
		];

		this.torrentStates = [
			{
				id: TorrentState.ANY,
				label: 'Status'
			},
			{
				id: TorrentState.RUNNING,
				label: 'En cours'
			},
			{
				id: TorrentState.FINISHED,
				label: 'Fini'
			},
		];
	}

	searchTextChange(searchTorrent: string) {
		this.searchTorrentChange.emit(searchTorrent);
	}

	selectApi(selectOption: SelectOption) {
		this.apiPicked.emit(selectOption.id as ApiType);
	}

	selectTorrentState(selectOption: SelectOption) {
		this.torrentStatePicked.emit(selectOption.id as TorrentState);
	}
}
