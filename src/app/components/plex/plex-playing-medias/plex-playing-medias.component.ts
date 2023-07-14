import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {PlexService} from "../../../service/plex.service";
import {PlexPlayingMedia} from "../../../models/plex/plex-playing-medias";
import {BaseComponent} from "../../base.component";

@Component({
  selector: 'app-plex-playing-medias',
  templateUrl: './plex-playing-medias.component.html',
  styleUrls: ['./plex-playing-medias.component.scss']
})
export class PlexPlayingMediasComponent extends BaseComponent {
	public playingMedias: PlexPlayingMedia[] = [];

	@Output() hasAnyMedia$ = new EventEmitter<boolean>();

	@ViewChild('item', {static: false, read: ElementRef}) mediaChild!: ElementRef;

	get canDisplayMedias() {
		return this.playingMedias?.length > 0;
	}

  constructor(private _plexService: PlexService) {
		super();

		this._plexService.getPlayingMedias().subscribe(medias => {
			this.playingMedias = medias;
			this.getThumbnail();
			this.hasAnyMedia$.emit(medias.length > 0);
		});
	}

	private getThumbnail() {
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
