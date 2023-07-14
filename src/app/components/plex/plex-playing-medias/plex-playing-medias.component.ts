import {Component, EventEmitter, Output} from '@angular/core';
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

	get canDisplayMedias() {
		return this.playingMedias?.length > 0;
	}

  constructor(private _plexService: PlexService) {
		super();

		this._plexService.getPlayingMedias().subscribe(medias => {
			this.playingMedias = medias;
			this.hasAnyMedia$.emit(medias.length > 0);
		});
	}
}
