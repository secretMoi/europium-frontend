import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {PlexPlayingMedia} from "../../../models/plex/plex-playing-medias";
import {SafeUrl} from "@angular/platform-browser";
import {PlexService} from "../../../service/plex.service";

interface ImageBlob {
	image?: SafeUrl;
}

type PlexPlayingMediaExtended = PlexPlayingMedia & ImageBlob;

@Component({
  selector: 'app-plex-playing-media-item',
  templateUrl: './plex-playing-media-item.component.html',
  styleUrls: ['./plex-playing-media-item.component.scss']
})
export class PlexPlayingMediaItemComponent implements AfterViewInit {
	@Input() playingMedia!: PlexPlayingMediaExtended;

	@ViewChild('item', {static: false, read: ElementRef}) mediaChild!: ElementRef;

  constructor(private _plexService: PlexService) { }

  ngAfterViewInit() {
		this._plexService.getThumbnail({
				size: this.mediaChild.nativeElement.offsetWidth,
				isArt: true,
				media: {parentId: this.playingMedia.id, ...this.playingMedia}
			}
		).subscribe(async image => this.playingMedia.image = await image);

		setTimeout(() => {
			console.warn(this.playingMedia.image)
		}, 3000);
  }

	getProgress(media: PlexPlayingMedia) {
		return media.progress / media.duration * 100;
	}
}
