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

}
