import {Component, Input, OnInit} from '@angular/core';
import {MonitoredApi} from "../../models/monitored-api";

@Component({
  selector: 'app-api-monitored-card',
  templateUrl: './api-monitored-card.component.html',
  styleUrls: ['./api-monitored-card.component.scss']
})
export class ApiMonitoredCardComponent implements OnInit{

  @Input() monitoredApi!: MonitoredApi;

  ngOnInit(): void {

  }

  getApiState(): boolean | null {
    let hasUp: boolean = false;
    let hasDown: boolean = false;

    this.monitoredApi.apiUrls.forEach((apiUrl) => {
      if(apiUrl.state) {
        hasUp = true;
      }
      else {
        hasDown = true;
      }
    });

    if(hasUp && !hasDown) {
      return true;
    }

    if(!hasUp && hasDown) {
      return false;
    }

    if(hasUp && hasDown) {
      return null;
    }

    return null;
  }

  navigateToApiLink() {
    window.open(this.monitoredApi.url);
  }
}
