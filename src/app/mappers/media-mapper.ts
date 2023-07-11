import {MediaType} from "../models/ygg-torrent-search";

export const getMediaTypeLabel = (mediaType: MediaType): string => {
	if(mediaType === MediaType.Serie) return 'Série';
	if(mediaType === MediaType.Movie) return 'Film';
	if(mediaType === MediaType.Anime) return 'Animé';

	return 'Inconnu';
}
