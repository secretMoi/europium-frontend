import {Component} from '@angular/core';
import {YggTorrentService} from "../../service/ygg-torrent.service";
import {MediaQuality, MediaType, YggTorrentSearch} from "../../models/ygg-torrent-search";

@Component({
	selector: 'app-ygg-search',
	templateUrl: './ygg-search.component.html',
	styleUrls: ['./ygg-search.component.scss']
})
export class YggSearchComponent {
	public searchText!: string;
	public yggTorrentSearch: YggTorrentSearch[] = [];

	constructor(private _yggTorrentService: YggTorrentService) {
	}

	public search() {
		this._yggTorrentService.search(this.searchText).subscribe(results => this.yggTorrentSearch = results);
	}

	public mediaType(torrent: YggTorrentSearch): string {
		if(torrent.mediaType === MediaType.Serie) return 'Série';
		if(torrent.mediaType === MediaType.Movie) return 'Film';

		return 'Inconnu';
	}

	public mediaQuality(torrent: YggTorrentSearch): string {
		if(torrent.mediaQuality === MediaQuality.FHD) return '1080';
		if(torrent.mediaQuality === MediaQuality.UHD) return '4K';
		if(torrent.mediaQuality === MediaQuality.HD) return '720';

		return 'Inconnu';
	}
}
