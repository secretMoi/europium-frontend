import {Movie} from "./movie";

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

	season?: number;
	episode?: number;
}
