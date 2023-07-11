import {MediaType} from "../ygg-torrent-search";
import {SafeUrl} from "@angular/platform-browser";

export interface PlexMediaHistory {
	id?: number;
	user: string;
	title: string;
	mediaType: MediaType;
	seenAt: number;
	parentId: number;
	thumbnailId: number;
	image: SafeUrl;
}
