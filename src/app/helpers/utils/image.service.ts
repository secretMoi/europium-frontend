import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

import {Injectable} from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class ImageService {

	constructor(private readonly domSanitizer: DomSanitizer) {}

	public createImageFromBlob(image: Blob, media: { image?: SafeUrl }) {
		let reader = new FileReader();
		reader.onloadend = () => media.image = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string);

		reader.readAsDataURL(image);
	}

	blobToBase64(blob: Blob): Promise<SafeUrl> {
		return new Promise<SafeUrl>((resolve, reject) => {
			const reader = new FileReader();

			reader.onloadend = () => {
				const base64String = this.domSanitizer.bypassSecurityTrustUrl(reader.result as string);
				resolve(base64String);
			};

			reader.onerror = () => {
				reject('Error converting Blob to Base64.');
			};

			reader.readAsDataURL(blob);
		});
	}
}
