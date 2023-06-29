import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
	@Input() value!: number;
	@Input() height: number = 5;

	ngOnInit(): void {
		console.log(this.height);
		document.documentElement.style.setProperty('--height', this.height.toString());
	}
}
