import {Movie} from "./movie";

export class Season {
	air_date!: string;
	episode_count!: number;
	id!: number;
	name!: string;
	overview!: string;
	poster_path!: string;
	season_number!: number;
}

export class TorrentInfo {
  name!: string;
  category?: string;
  state!: string;
  size!: number;
  progress!: number
  eta!: number;
  added_on!: number;
  completion_on?: number;
  completed?: number;
  downloaded?: number;
  dlspeed!: number;
  total_size?: number;
  save_path?: string;
  hash!: string;

	movie?: Movie;

	seasons?: Season[];

	season?: number;
	episode?: number;
}
