import {PlexLibraryType} from "./plex-library-type";

export interface PlexLibrary {
	id: number;
	type: PlexLibraryType;
	title: string;
}
