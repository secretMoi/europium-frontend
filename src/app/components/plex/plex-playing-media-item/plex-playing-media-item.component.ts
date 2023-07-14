import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {PlexPlayingMedia} from "../../../models/plex/plex-playing-medias";
import {SafeUrl} from "@angular/platform-browser";
import {PlexService} from "../../../service/plex.service";

interface ImageBlob {
	image?: SafeUrl;
	parentId?: number;
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
		this.playingMedia.parentId = this.playingMedia.id;

		this._plexService.getThumbnail({
				size: this.mediaChild.nativeElement.offsetWidth,
				isArt: true,
				media: this.playingMedia
			}
		).subscribe();
  }

	getProgress(media: PlexPlayingMedia) {
		return media.progress / media.duration * 100;
	}
}
