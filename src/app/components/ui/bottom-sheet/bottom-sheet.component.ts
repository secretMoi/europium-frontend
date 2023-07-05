import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit, AfterViewInit {
	@Input() canDrag: boolean = false;

	public isOpen: boolean = true;
	public isClosed: boolean = false;

	private animationDuration = '500ms';

	@ViewChild('container', {static: false}) container!: ElementRef;
	@ViewChild('bottomSheet', {static: false}) bottomSheet!: ElementRef;

  constructor() { }

	ngOnInit() {
		document.documentElement.style.setProperty('--animation-duration', this.animationDuration);
	}

	ngAfterViewInit() {
		//const containerElement = this.container.nativeElement as HTMLElement;
		this.container.nativeElement.style.height = ( this.container.nativeElement.offsetHeight - this.bottomSheet.nativeElement.offsetHeight) + 'px';
	}

	close($event: MouseEvent) {
		$event.stopPropagation();
		this.isOpen = false;

		setTimeout(() => {
			this.isClosed = true;
		}, Number(this.animationDuration.slice(0, -2)));
	}
}
