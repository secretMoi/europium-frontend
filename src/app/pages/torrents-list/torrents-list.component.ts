import {Component, OnInit} from '@angular/core';
import {TorrentService} from "../../service/torrent.service";
import {TorrentInfo} from "../../models/torrent-info";

@Component({
  selector: 'app-torrents-list',
  templateUrl: './torrents-list.component.html',
  styleUrls: ['./torrents-list.component.scss']
})
export class TorrentsListComponent implements OnInit {
  torrents!: TorrentInfo[];
  lastSortedProperty!: string;
  sortOrder: number = 1;

  constructor(
    private torrentService: TorrentService
  ) {
    torrentService.getAllTorrents().subscribe(
      (torrents) => this.torrents = torrents
    );
  }

  ngOnInit(): void {
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

  displayState(state: string): string {
    if (state === 'pausedUP') return 'assets/check.svg';
    if (state === 'downloading') return 'assets/play.svg';
    if (state === 'error') return 'assets/cancel.svg';

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
      return Math.round(speed / 1000000) / 100 + 'Mo/s';
    }

    if (speed > 1000) {
      return Math.round(speed / 1000) / 100 + 'ko/s';
    }

    return speed.toString();
  }
}
