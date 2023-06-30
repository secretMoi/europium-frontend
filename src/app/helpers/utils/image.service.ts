import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

import {Injectable} from "@angular/core";
@Injectable({
	providedIn: 'root'
})
export class ImageService {

	constructor(private readonly domSanitizer: DomSanitizer) {
	}

	public createImageFromBlob(image: Blob, duplicate: { image?: SafeUrl }) {
		let reader = new FileReader();
		reader.onloadend = () => {
			duplicate.image = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string);
		}

		reader.readAsDataURL(image);
	}
}
