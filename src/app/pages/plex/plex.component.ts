import {Component} from '@angular/core';
import {PlexDuplicate} from "../../models/plex/plex-duplicate";
import {SafeUrl} from "@angular/platform-browser";
import {BaseComponent} from "../../components/base.component";

interface ImageBlob {
	image?: SafeUrl;
}

export type PlexDuplicateExtended = PlexDuplicate & ImageBlob;

enum SubMenus {
	Current,
	Duplicates,
	History,
}

@Component({
	selector: 'app-plex',
	templateUrl: './plex.component.html',
	styleUrls: ['./plex.component.scss']
})
export class PlexComponent extends BaseComponent {
	canDisplayPlayingMedia: boolean = false;

	currentSubMenu: SubMenus = SubMenus.Current;
	readonly subMenus = SubMenus;

	get buttons() {
		return [
			{
				image: 'duplicate.svg',
				id: SubMenus.Duplicates
			},
			{
				image: 'play-theme.svg',
				id: SubMenus.Current
			},
			{
				image: 'history.svg',
				id: SubMenus.History
			}
		];
	}

	constructor() {
		super();
	}

	subMenuSelected($event: number) {
		this.currentSubMenu = $event as SubMenus;
	}

	setPlayingMediaVisibility(isVisible: boolean) {
		this.canDisplayPlayingMedia = isVisible;
	}
}
