import {Component} from '@angular/core';
import {PlexService} from "../../../service/plex.service";
import {PlexMediaHistory} from "../../../models/plex/plex-media-history";
import {BaseComponent} from "../../base.component";
import {ImageService} from "../../../helpers/utils/image.service";

@Component({
	selector: 'app-plex-history',
	templateUrl: './plex-history.component.html',
	styleUrls: ['./plex-history.component.scss']
})
export class PlexHistoryComponent extends BaseComponent {
	public mediasHistory: PlexMediaHistory[] = [];

	constructor(private _plexService: PlexService, private _imageService: ImageService) {
		super();

		this._plexService.getMediaHistory().subscribe(history => this.mediasHistory = history);
	}
}
