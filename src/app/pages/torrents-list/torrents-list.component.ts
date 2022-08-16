import {Component, OnDestroy} from '@angular/core';
import {TorrentService} from "../../service/torrent.service";
import {TorrentInfo} from "../../models/torrent-info";
import {map, Subscription, timer} from "rxjs";

@Component({
  selector: 'app-torrents-list',
  templateUrl: './torrents-list.component.html',
  styleUrls: ['./torrents-list.component.scss']
})
export class TorrentsListComponent implements OnDestroy {
  torrents!: TorrentInfo[];
  lastSortedProperty!: string;
  sortOrder: number = 1;
	timerSubscription: Subscription;

	constructor(
    private torrentService: TorrentService
  ) {
		this.timerSubscription = timer(0, 2000).pipe(
			map(() => {
				this.refreshTorrentList();
			})
		).subscribe();
  }

	ngOnDestroy(): void {
		this.timerSubscription.unsubscribe();
	}

	refreshTorrentList() {
		this.torrentService.getAllTorrents().subscribe(
			(torrents) => {
				this.torrents = torrents;
				this.sortOrder *= -1;
				this.dynamicSort(this.lastSortedProperty);
			}
		);
	}

  dynamicSort(property: string) {
    if (this.lastSortedProperty === property) {
      this.sortOrder *= -1;
    } else {
      this.sortOrder = 1;
    }

    this.lastSortedProperty = property;
    let sortOrder = this.sortOrder;

    this.torrents.sort(function (a: any, b: any) {
      // works with strings and numbers
      let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    });
  }

  getSizeToDisplay(size: number): string {
    if (size > 1000000000) {
      return Math.round(size / 10000000) / 100 + 'Go';
    }

    if (size > 1000000) {
      return Math.round(size / 1000000) / 100 + 'Mo';
    }

    return size.toString();
  }

	getProgressToDisplay(progress: number){
		return Math.round(progress * 100 * 10) / 10;
	}

  displayState(state: string): string {
    if (state === 'pausedUP') return 'assets/check.svg';
    if (state === 'uploading') return 'assets/check.svg';
    if (state === 'downloading') return 'assets/play.svg';
    if (state === 'error') return 'assets/cancel.svg';
    if (state === 'missingFiles') return 'assets/broken-link.svg';

    return 'assets/interrogation-mark.svg';
  }

  convertEta(seconds: number): string {
    if(seconds == 8640000) return '0';

    let d = Math.floor(seconds / (3600 * 24));
    let h = Math.floor(seconds % (3600 * 24) / 3600);
    let m = Math.floor(seconds % 3600 / 60);
    let s = Math.floor(seconds % 60);

    let dDisplay = d > 0 ? d + 'j' : "";
    let hDisplay = h > 0 ? h + 'h' : "";
    let mDisplay = m > 0 ? m + 'm' : "";
    let sDisplay = s > 0 ? s + 's' : "";

    return dDisplay + hDisplay + mDisplay + sDisplay;
  }

  convertSpeed(speed: number): string {
    if (speed > 1000000) {
      return Math.round(speed / 1000000) + 'Mo/s';
    }

    if (speed > 1000) {
      return Math.round(speed / 1000) + 'ko/s';
    }

    return speed.toString();
  }

	deleteTorrent(torrent: TorrentInfo) {
		this.torrentService.deleteTorrent(torrent.hash).subscribe(
			_ => {
				const index = this.torrents.indexOf(torrent, 0);
				if (index > -1) {
					this.torrents.splice(index, 1);
				}
			}
		);
	}
}