export interface YggTorrentSearch {
	name: string;
	pageUrl: string;
	torrentUrl: string;
	age: string;
	size: string;
	downloaded: string;
	seeders: string;
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
