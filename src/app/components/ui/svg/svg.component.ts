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
			.subscribe(value => this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(this._changeAttributes(value)));
	}

	private _changeAttributes(svgContent: string): string {
		svgContent = this._changeColors(svgContent);
		svgContent = this._changeSizes(svgContent);

		return svgContent;
	}

	private _changeColors(svgContent: string): string {
		if	(!this.colors || this.colors.length === 0) return svgContent;

		for (let index = 0; index < this.colors.length; index++)
			svgContent = this._setColor(svgContent, 'path' + index, this.colors[index]);

		return svgContent;
	}

	private _changeSizes(svgContent: string): string {
		return svgContent.replace(`<svg`, `<svg height="${this.height}px" width="${this.width ?? this.height}px"`);
	}

	private _setColor(svgContent: string, className: string, color: string): string {
		return svgContent.replace(`class="${className}"`, `fill="${color}"`);
	}
}
