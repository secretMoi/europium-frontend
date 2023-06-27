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
	public filterLibraryId: number | null = null;

  constructor(private _plexService: PlexService) {
		this._plexService.getLibraries().subscribe(res => {
			this.plexLibraries = res;
			this.filterLibraryId = this.plexLibraries[0].id;
			this.selectLibrary();
		});
	}

	public trackById(_: any, plexDuplicate: { id: number }): number {
		return plexDuplicate.id;
	}

	deleteMedia() {

	}

	selectLibrary() {
		this._plexService.getDuplicates(this.filterLibraryId!).subscribe(res => this.plexDuplicates = res);
	}
}
