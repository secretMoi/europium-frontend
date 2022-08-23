export interface AlternateTitle {
	sourceType: string;
	movieMetadataId: number;
	title: string;
	sourceId: number;
	votes: number;
	voteCount: number;
	language: Language;
	id: number;
}

export interface Image {
	coverType: string;
	url: string;
	remoteUrl: string;
}

export interface Imdb {
	votes: number;
	value: number;
	type: string;
}

export interface Language {
	id: number;
	name: string;
}

export interface MediaInfo {
	audioBitrate: number;
	audioChannels: number;
	audioCodec: string;
	audioLanguages: string;
	audioStreamCount: number;
	videoBitDepth: number;
	videoBitrate: number;
	videoCodec: string;
	videoDynamicRangeType: string;
	videoFps: number;
	resolution: string;
	runTime: string;
	scanType: string;
	subtitles: string;
}

export interface Metacritic {
	votes: number;
	value: number;
	type: string;
}

export interface MovieFile {
	movieId: number;
	relativePath: string;
	path: string;
	size: number;
	dateAdded: Date;
	indexerFlags: number;
	quality: QualityContainer;
	mediaInfo: MediaInfo;
	originalFilePath: string;
	qualityCutoffNotMet: boolean;
	languages: Language[];
	releaseGroup: string;
	edition: string;
	id: number;
}

export interface OriginalLanguage {
	id: number;
	name: string;
}

export interface QualityDetail {
	revision: Revision;
	id: number;
	name: string;
	source: string;
	resolution: number;
	modifier: string;
}

export interface QualityContainer {
	quality: QualityDetail;
	revision: Revision;
	id: number;
	name: string;
	source: string;
	resolution: number;
	modifier: string;
}

export interface Ratings {
	imdb: Imdb;
	tmdb: Tmdb;
	metacritic: Metacritic;
	rottenTomatoes: RottenTomatoes;
}

export interface Revision {
	version: number;
	real: number;
	isRepack: boolean;
}

export interface RadarrInformation {
	fileLink: string;
	title: string;
	originalTitle: string;
	originalLanguage: OriginalLanguage;
	alternateTitles: AlternateTitle[];
	secondaryYearSourceId: number;
	sortTitle: string;
	sizeOnDisk: number;
	status: string;
	overview: string;
	inCinemas: Date;
	physicalRelease: Date;
	digitalRelease: Date;
	images: Image[];
	website: string;
	year: number;
	hasFile: boolean;
	youTubeTrailerId: string;
	studio: string;
	path: string;
	qualityProfileId: number;
	monitored: boolean;
	minimumAvailability: string;
	isAvailable: boolean;
	folderName: string;
	runtime: number;
	cleanTitle: string;
	imdbId: string;
	tmdbId: number;
	titleSlug: string;
	certification: string;
	genres: string[];
	tags: any[];
	added: Date;
	ratings: Ratings;
	movieFile: MovieFile;
	popularity: number;
	id: number;
}

export interface RottenTomatoes {
	votes: number;
	value: number;
	type: string;
}

export interface Tmdb {
	votes: number;
	value: number;
	type: string;
}
