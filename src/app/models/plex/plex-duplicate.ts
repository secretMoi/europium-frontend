import {PlexMedia} from "./plex-media";

export interface PlexDuplicate {
	id: number;
	title: string;
	plexMedias: PlexMedia[];
}
