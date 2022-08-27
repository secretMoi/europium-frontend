import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-metadata-element',
  templateUrl: './metadata-element.component.html',
  styleUrls: ['./metadata-element.component.scss']
})
export class MetadataElementComponent {

	@Input() label!: string;
	@Input() value!: string;
	@Input() imageToDisplay!: string;

  constructor() { }

}
