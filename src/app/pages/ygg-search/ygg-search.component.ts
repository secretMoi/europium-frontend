import {Component} from '@angular/core';
import {YggTorrentService} from "../../service/ygg-torrent.service";
import {MediaQuality, MediaType, YggTorrentSearch} from "../../models/ygg-torrent-search";
import {dynamicSort} from "../../helpers/utils/array";

@Component({
	selector: 'app-ygg-search',
	templateUrl: './ygg-search.component.html',
	styleUrls: ['./ygg-search.component.scss']
})
export class YggSearchComponent {
	public yggTorrentSearch: YggTorrentSearch[] = [];
	public sortByProperty: string = '';
	public sortOrder: boolean = false;
	public mediaType: MediaType = MediaType.Unknown;

	private previousSortByProperty = '';

	constructor(private _yggTorrentService: YggTorrentService) {}

	public search(searchText: string) {
		this._yggTorrentService.search(searchText).subscribe(results => this.yggTorrentSearch = results);
	}

	public getMediaType(torrent: YggTorrentSearch): string {
		if(torrent.mediaType === MediaType.Serie) return 'Série';
		if(torrent.mediaType === MediaType.Movie) return 'Film';
		if(torrent.mediaType === MediaType.Anime) return 'Animé';

		return 'Inconnu';
	}

	public mediaQuality(torrent: YggTorrentSearch): string {
		if(torrent.mediaQuality === MediaQuality.FHD) return '1080';
		if(torrent.mediaQuality === MediaQuality.UHD) return '4K';
		if(torrent.mediaQuality === MediaQuality.HD) return '720';

		return 'Inconnu';
	}

	public sortTorrents(property: string) {
		if(this.sortByProperty === property)
			this.sortOrder = !this.sortOrder;
		else
			this.sortOrder = false;

		this.sortByProperty = property;
		this.yggTorrentSearch = dynamicSort(this.yggTorrentSearch, this.sortByProperty, this.sortByProperty === this.previousSortByProperty && this.sortOrder);
		this.previousSortByProperty = this.sortByProperty;
	}

	public canDisplayTorrent(torrent: YggTorrentSearch): boolean {
		if(this.mediaType === MediaType.Unknown) return true;

		return torrent.mediaType === this.mediaType;
	}

	public changeMediaType(mediaType: MediaType) {
		this.mediaType = mediaType;
	}
}
