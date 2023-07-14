import {SafeUrl} from "@angular/platform-browser";

export interface PlexPictureParameters {
	size?: number;
	isArt?: boolean;
	media: {parentId: number, thumbnailId?: number, image?: SafeUrl};
}
