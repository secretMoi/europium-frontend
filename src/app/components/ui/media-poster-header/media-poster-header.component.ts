import {Component, Input, OnInit} from '@angular/core';
import {SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-media-poster-header',
  templateUrl: './media-poster-header.component.html',
  styleUrls: ['./media-poster-header.component.scss']
})
export class MediaPosterHeaderComponent {
	@Input() image!: SafeUrl;
	@Input() title!: string;
}
