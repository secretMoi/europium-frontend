import {Component, Input, OnInit} from '@angular/core';
import {MonitoredApi} from "../../models/monitored-api";
import {animate, state, style, transition, trigger} from "@angular/animations";

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
export class ApiMonitoredCardComponent implements OnInit{

  @Input() monitoredApi!: MonitoredApi;
  public isCollapsed = true;
  state: string = 'initial';

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

  rotate() {
    this.isCollapsed = !this.isCollapsed;
    this.state = (this.state === 'initial' ? 'final' : 'initial');
  }
}
