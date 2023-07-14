import {AfterViewInit, Component, Input} from '@angular/core';
import {PlexPlayingMedia} from "../../../models/plex/plex-playing-medias";
import {SafeUrl} from "@angular/platform-browser";

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

  constructor() { }

  ngAfterViewInit() {
  }

	getProgress(media: PlexPlayingMedia) {
		return media.progress / media.duration * 100;
	}
}
