import {MediaType} from "../ygg-torrent-search";

export interface PlexMediaHistory {
	id?: number;
	user: string;
	title: string;
	mediaType: MediaType;
	seenAt: number;
}
