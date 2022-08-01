import {Component, Input, OnInit} from '@angular/core';
import {MonitoredApi} from "../../models/monitored-api";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Subject} from "rxjs";
import {MonitoredApiService} from "../../service/monitored-api.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ApiState} from "../../models/api-state";

@Component({
  selector: 'app-api-monitored-card',
  templateUrl: './api-monitored-card.component.html',
  styleUrls: ['./api-monitored-card.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        transform: 'rotate(0)'
      })),
      state('final', style({
        transform: 'rotate(180deg)'
      })),
      transition('initial=>final', animate('200ms')),
      transition('final=>initial', animate('200ms'))
    ])],
})
export class ApiMonitoredCardComponent implements OnInit {

  @Input() monitoredApi!: MonitoredApi;
  @Input() monitoredApiChanged!: Subject<Object>;

  public isCollapsed = true;
  state: string = 'initial';

  image!: any;

  constructor(private monitoredApiService: MonitoredApiService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.monitoredApiChanged.subscribe(
      _ => {
        this.updateApiState();
        this.updateApiLogo();
      }
    );
  }

  updateApiState() {

    for(const apiUrl of this.monitoredApi.apiUrls){
      const apiState = new ApiState(this.monitoredApi.code, apiUrl.url);

      this.monitoredApiService.getApiState(apiState).subscribe(
        value => apiUrl.state = value,
        _ => apiUrl.state = false
      );
    }

  }

  updateApiLogo() {
    this.monitoredApiService.getApiLogo(this.monitoredApi.code).subscribe(
      (blobImage: any) => this.image = this.sanitizer.bypassSecurityTrustUrl(blobImage)
    );
  }

  getApiState(): boolean | null {
    let hasUp: boolean | null = null;
    let hasDown: boolean | null = null;

    this.monitoredApi.apiUrls.forEach((apiUrl) => {
      if(apiUrl.state) {
        hasUp = true;
      }
      else {
        hasDown = true;
      }
    });

    if(hasUp === true) {
      return true;
    }

    if(hasUp === false && hasDown === true) {
      return null;
    }

    if(hasUp === false && hasDown === false) {
      return false;
    }

    return null;
  }

  navigateToApiLink() {
    window.open(this.monitoredApi.url);
  }

  rotate() {
    this.isCollapsed = !this.isCollapsed;
    this.state = (this.state === 'initial' ? 'final' : 'initial');
  }
}
