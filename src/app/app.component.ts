import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystem} from "./fileSystem";
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
  fileSystems?: FileSystem[];

  chartData: ChartData[] = [];
  metaInfo?;

  @ViewChild(ChartComponent) chartComponent?:ChartComponent;
  @ViewChild(HorizontalChartComponent) horizontalChartComponent?:HorizontalChartComponent;

  constructor(private http: HttpClient) {

    this.http.get<FileSystem[]>(data.server.host + 'Storage').subscribe(
      (fileSystems: FileSystem[]) => {
        this.fileSystems = fileSystems;

        for(let fileSystem of fileSystems) {
          this.chartData?.push(new ChartData(
            +fileSystem.size.replace(/[^\d.-]/g,''),
            fileSystem.volume,
            fileSystem.size
          ));
        }

        this.chartComponent?.refreshChart();
        this.horizontalChartComponent?.refreshChart();
      }
    );

    //Metadata for the chart like width and height of the chart, Title for the chart, Title color etc..
    this.metaInfo = {
      'chartWidth':'800',
      'chartHeight': '600',
      'title':'Indian cricketers with Most Centuries',
      'titleColor':'#262626',
      'titleFont': '20px sans-serif',
      'columnTitleColor': '#262626',
      'columnFont': '16px sans-serif',
      'footerTitle':'Cricketer',
      'footerColor':'#c1d0cd',
      'footerFont': '12px sans-serif',
      'leftaxisColor': '#c1d0cd',
      'leftaxisFont': '12px sans-serif',
    }
  }
}
