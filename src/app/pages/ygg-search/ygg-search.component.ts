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
	public searchText!: string;
	public yggTorrentSearch: YggTorrentSearch[] = [];
	public sortByProperty: string = '';
	public sortOrder: boolean = false;
	public filterMediaType: MediaType = MediaType.Unknown;
	public mediaType = MediaType;

	private previousSortByProperty = '';

	constructor(private _yggTorrentService: YggTorrentService) {}

	public search() {
		this._yggTorrentService.search(this.searchText).subscribe(results => this.yggTorrentSearch = results);
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
		this.sortByProperty = property;



		this.yggTorrentSearch = dynamicSort(this.yggTorrentSearch, this.sortByProperty, this.sortByProperty === this.previousSortByProperty);
		this.previousSortByProperty = this.sortByProperty;
	}

	public canDisplayTorrent(torrent: YggTorrentSearch): boolean {
		if(this.filterMediaType === MediaType.Unknown) return true;

		return torrent.mediaType === this.filterMediaType;
	}
}
