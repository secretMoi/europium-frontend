import { Component, OnInit } from '@angular/core';
import {TorrentService} from "../../service/torrent.service";
import {TorrentInfo} from "../../models/torrent-info";

@Component({
  selector: 'app-torrents-list',
  templateUrl: './torrents-list.component.html',
  styleUrls: ['./torrents-list.component.scss']
})
export class TorrentsListComponent implements OnInit {
  torrents!: TorrentInfo[];

  constructor(
    private torrentService: TorrentService
  ) {
    torrentService.getAllTorrents().subscribe(
      (torrents) => this.torrents = torrents
    );
  }

  ngOnInit(): void {
  }

}
