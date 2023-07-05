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

	public svgIcon?: SafeHtml;

  constructor(private _httpClient: HttpClient, private sanitizer: DomSanitizer) {	}

	ngOnInit() {
		this._httpClient
			.get(`assets/${this.name}.svg`, { responseType: 'text' })
			.subscribe(value => this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(this._changeColors(value)));
	}

	private _changeColors(svgContent: string): string {
		if	(!this.colors || this.colors.length === 0) return svgContent;

		for (let index = 0; index < this.colors.length; index++)
			svgContent = this._setColor(svgContent, 'path' + index, this.colors[index]);

		return svgContent;
	}

	private _setColor(svgContent: string, className: string, color: string): string {
		return svgContent.replace(`class="${className}"`, `fill="${color}"`);
	}
}
