import {MediaType} from "../ygg-torrent-search";

export interface PlexMediaHistory {
	id?: number;
	userId: number;
	title: string;
	mediaType: MediaType;
	seenAt: number;
}
