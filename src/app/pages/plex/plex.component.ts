import {Component} from '@angular/core';
import {PlexService} from "../../service/plex.service";
import {PlexDuplicate} from "../../models/plex/plex-duplicate";
import {PlexLibrary} from "../../models/plex/plex-library";

@Component({
  selector: 'app-plex',
  templateUrl: './plex.component.html',
  styleUrls: ['./plex.component.scss']
})
export class PlexComponent {
	public plexDuplicates: PlexDuplicate[] = [];
	public plexLibraries: PlexLibrary[] = [];
	public filterLibrary: PlexLibrary | null = null;

  constructor(private _plexService: PlexService) {
		this._plexService.getLibraries().subscribe(res => {
			this.plexLibraries = res;
			this.filterLibrary = this.plexLibraries[0];
			this.selectLibrary();
		});
	}

	public trackById(_: any, plexDuplicate: { id: number }): number {
		return plexDuplicate.id;
	}

	deleteMedia() {

	}

	selectLibrary() {
		this._plexService.getDuplicates(this.filterLibrary!).subscribe(res => this.plexDuplicates = res);
	}
}
