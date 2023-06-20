export interface YggTorrentSearch {
	name: string;
	pageUrl: string;
	torrentUrl: string;
	age: number;
	size: number;
	downloaded: number;
	seeders: number;
	mediaQuality: MediaQuality;
	mediaType: MediaType;
}

export enum MediaQuality
{
	Unknown,
	HD,
	FHD,
	UHD
}

export enum MediaType
{
	Unknown,
	Movie,
	Serie,
	Anime
}
