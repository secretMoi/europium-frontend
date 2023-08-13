import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {SafeUrl} from "@angular/platform-browser";

@Component({
	selector: 'app-image-loader',
	templateUrl: './image-loader.component.html',
	styleUrls: ['./image-loader.component.scss']
})
export class ImageLoaderComponent implements AfterViewInit {
	@Input() image?: SafeUrl;

	@Input() fitHeight: boolean = false;
	@Input() fitWidth: boolean = false;

	@Input() shift?: string;

	@ViewChild('imageElement') imageElement!: ElementRef;

	ngAfterViewInit() {
		if(this.shift)
			this.imageElement.nativeElement.style.transform = `translateX(${this.shift})`;
	}
}
