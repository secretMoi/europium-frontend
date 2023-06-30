export interface PlexPlayingMedia {
	id: number;
	title: string;
	remoteBitrate: number;
	isPlaying: boolean;
	isRemote: boolean;
	progress: number;
	duration: number;
	year: number;
	thumbnailId: number;
	userName: string;
	isVideoTranscoding: boolean;
	remoteResolution: string;
	videoCodec: string;
	isAudioTranscoding: boolean;
	audioTitle: string;
}
