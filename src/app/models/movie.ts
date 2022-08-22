import {Season} from "./torrent-info";

export class Movie {
	id!: number;
	link!: string;
	title!: string;
	overview!: string;
	vote_average!: number;
	original_title!: string;
	poster_path!: string;
	backdrop_path!: string;

	seasons?: Season[];
}
