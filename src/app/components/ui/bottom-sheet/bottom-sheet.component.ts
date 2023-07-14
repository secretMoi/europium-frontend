import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit, AfterViewInit {
	@Input() canDrag: boolean = false;
	@Input() isOpen: boolean = false;
	@Input() close$?: Observable<void>;

	@Output() onClose = new EventEmitter();

	public isClosed: boolean = false;

	private animationDuration = '500ms';

	@ViewChild('container', {static: false}) container!: ElementRef;
	@ViewChild('bottomSheet', {static: false}) bottomSheet!: ElementRef;

	ngOnInit() {
		document.documentElement.style.setProperty('--animation-duration', this.animationDuration);

		this.close$?.subscribe(_ => this.close())
	}

	ngAfterViewInit() {
		this.container.nativeElement.style.height = (this.container.nativeElement.offsetHeight - this.bottomSheet.nativeElement.offsetHeight) + 'px';
	}

	close($event: MouseEvent | void) {
		if($event) $event.stopPropagation();

		this.isOpen = false;

		setTimeout(() => {
			this.isClosed = true;
			this.onClose.emit();
		}, Number(this.animationDuration.slice(0, -2)));
	}
}
