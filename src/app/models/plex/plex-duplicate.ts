import {PlexMedia} from "./plex-media";

export interface PlexDuplicate {
	id: number;
	parentId: number;
	thumbnailId: number;
	title: string;
	totalSize: number;
	plexMedias: PlexMedia[];
}
