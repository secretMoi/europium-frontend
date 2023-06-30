import { Component } from '@angular/core';
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

  constructor(private _plexService: PlexService, private _imageService: ImageService) {
		super();

		this._plexService.getPlayingMedias().subscribe(medias => {
			this.playingMedias = medias;
			medias.forEach(media => this._getThumbnail(media));
		});
	}

	private _getThumbnail(media: PlexPlayingMediaExtended) {
		this._plexService.getThumbnail(media.id, media.thumbnailId)
			.subscribe(data => this._imageService.createImageFromBlob(data, media));
	}

	// getMediaDataTags(media: PlexPlayingMedia) {
	// 	return [
	// 		{label: 'Taille', value: this._formatFileSizePipe.transform(media.size)},
	// 		{label: 'Résolution', value: media.resolution},
	// 		{label: 'Débit', value: media.bitrate},
	// 		{label: 'Codec', value: media.videoCodec},
	// 	];
	// }
}
