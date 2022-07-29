import {Component, OnInit} from '@angular/core';
import {MonitoredApiService} from "../../service/monitored-api.service";
import {MonitoredApi} from "../../models/monitored-api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  monitoredApis!: MonitoredApi[];

  constructor(private monitoredApiService: MonitoredApiService) {}

  ngOnInit(): void {
    this.monitoredApiService.getMonitoredApis().subscribe(
      (monitoredApis) => this.monitoredApis = monitoredApis
    );
  }

}
