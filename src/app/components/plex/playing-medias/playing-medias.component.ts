import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {PlexService} from "../../../service/plex.service";
import {PlexPlayingMedia} from "../../../models/plex/plex-playing-medias";
import {BaseComponent} from "../../base.component";
import {SafeUrl} from "@angular/platform-browser";
import {ImageService} from "../../../helpers/utils/image.service";

interface ImageBlob {
	image?: SafeUrl;
}

type PlexPlayingMediaExtended = PlexPlayingMedia & ImageBlob;

@Component({
  selector: 'app-playing-medias',
  templateUrl: './playing-medias.component.html',
  styleUrls: ['./playing-medias.component.scss']
})
export class PlayingMediasComponent extends BaseComponent {
	public playingMedias: PlexPlayingMediaExtended[] = [];

	@Output() hasAnyMedia$ = new EventEmitter<boolean>();

	@ViewChild('item', {static: false, read: ElementRef}) mediaChild!: ElementRef;

	get canDisplayMedias() {
		return this.playingMedias?.length > 0;
	}

  constructor(private _plexService: PlexService, private _imageService: ImageService) {
		super();

		this._plexService.getPlayingMedias().subscribe(medias => {
			this.playingMedias = medias;
			this.getThumbnail();
			this.hasAnyMedia$.emit(medias.length > 0);
		});
	}

	getProgress(media: PlexPlayingMedia) {
		return media.progress / media.duration * 100;
	}

	private getThumbnail() {
		console.warn(this.playingMedias);
		for (let playingMedia of this.playingMedias) {
			this._plexService.getThumbnail({
					size: this.mediaChild.nativeElement.offsetWidth,
					isArt: true,
					media: {parentId: playingMedia.id, ...playingMedia}
				}
			).subscribe();
		}
	}
}
