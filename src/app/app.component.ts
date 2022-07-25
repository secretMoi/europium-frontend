import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystem} from "./models/fileSystem";
import data from '../config.json';
import {ChartData} from "./chart/chartData";
import {ChartComponent} from "./chart/chart.component";
import {HorizontalChartComponent} from "./horizontal-chart/horizontal-chart.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
