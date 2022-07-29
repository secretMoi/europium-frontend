import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MonitoredApi} from "../../models/MonitoredApi";
import {BehaviorSubject, Subject} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-api-monitored-card',
  templateUrl: './api-monitored-card.component.html',
  styleUrls: ['./api-monitored-card.component.scss']
})
export class ApiMonitoredCardComponent implements OnInit{

  @Input() monitoredApi!: MonitoredApi;
  @Input() monitoredApiChanged!: Subject<Object>;
  state!: boolean;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.monitoredApiChanged.subscribe(
      _ => {

        this.httpClient.get(this.monitoredApi.url).subscribe(
          _ => this.state = true,
          _ => this.state = false
        );
      }
    );
  }

  navigateToApiLink() {
    window.open(this.monitoredApi.url);
  }
}
