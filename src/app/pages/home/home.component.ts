import {Component, OnInit} from '@angular/core';
import {MonitoredApiService} from "../../service/monitored-api.service";
import {MonitoredApi} from "../../models/monitored-api";
import {ReplaySubject, Subject} from "rxjs";
import {YggTorrentService} from "../../service/ygg-torrent.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  monitoredApis!: MonitoredApi[];
  monitoredApisValueChanged: Subject<Object> = new ReplaySubject<Object>(1);

  constructor(private monitoredApiService: MonitoredApiService, private _yggTorrentService: YggTorrentService) {}

  ngOnInit(): void {
		this._yggTorrentService.getRatio().subscribe();

    this.monitoredApiService.getMonitoredApis().subscribe(
      (monitoredApis) => {
        this.monitoredApis = monitoredApis;
        this.monitoredApisValueChanged.next(true);
      }
    );
  }

}
