import {Component} from '@angular/core';
import {YggTorrentService} from "../../service/ygg-torrent.service";
import {YggTorrentSearch} from "../../models/ygg-torrent-search";

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

}
