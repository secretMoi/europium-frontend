import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {
	@Input() name!: string;
	@Input() height?: number;
	@Input() width?: number;
	@Input() colors?: string[];

	public svgPaths!: { d: string }[];
	public svgIcon?: SafeHtml;

  constructor(private _httpClient: HttpClient, private sanitizer: DomSanitizer) {	}

	ngOnInit() {
		this._httpClient
			.get(`assets/${this.name}.svg`, { responseType: 'text' })
			.subscribe(value => {
				const svg = this.sanitizer.bypassSecurityTrustHtml(value);

				//this._changeColors();

				this.svgIcon = svg;
			});
	}

	private _changeColors(svgContent: string): string {
		if(!this.colors || this.colors.length === 0) return '';

		return '';
		//svgContent.replace('')

		// for (let color of this.colors) {
		//
		// }
	}
}
