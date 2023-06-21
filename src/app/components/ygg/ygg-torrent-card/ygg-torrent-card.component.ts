import {Component, Input} from '@angular/core';
import {MediaQuality, MediaType, YggTorrentSearch} from "../../../models/ygg-torrent-search";

@Component({
  selector: 'app-ygg-torrent-card',
  templateUrl: './ygg-torrent-card.component.html',
  styleUrls: ['./ygg-torrent-card.component.scss']
})
export class YggTorrentCardComponent {

	@Input() torrent!: YggTorrentSearch;

	get getMediaType(): string {
		if(this.torrent.mediaType === MediaType.Serie) return 'Série';
		if(this.torrent.mediaType === MediaType.Movie) return 'Film';
		if(this.torrent.mediaType === MediaType.Anime) return 'Animé';

		return 'Inconnu';
	}

	get mediaQuality(): string {
		if(this.torrent.mediaQuality === MediaQuality.FHD) return '1080';
		if(this.torrent.mediaQuality === MediaQuality.UHD) return '4K';
		if(this.torrent.mediaQuality === MediaQuality.HD) return '720';

		return 'Inconnu';
	}
}
