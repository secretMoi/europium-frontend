import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystem} from "./fileSystem";
import data from '../config.json';
import {ChartData} from "./chart/chartData";
import {ChartComponent} from "./chart/chart.component";

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

  constructor(private http: HttpClient) {

    this.http.get<FileSystem[]>(data.server.host + 'Storage').subscribe(
      (fileSystems: FileSystem[]) => {
        this.fileSystems = fileSystems;

        for(let fileSystem of fileSystems) {
          this.chartData?.push(new ChartData(+fileSystem.size.replace(/[^\d.-]/g,''), fileSystem.volume));
        }

        this.chartComponent?.refreshChart();
      }
    );

    //Metadata for the chart like width and height of the chart, Title for the chart, Title color etc..
    this.metaInfo = {
      'chartWidth':'500',
      'chartHeight': '600',
      'title':'Indian cricketers with Most Centuries',
      'titleColor':'white',
      'titleFont': '20px sans-serif',
      'columnTitleColor': 'white',
      'columnFont': '12px sans-serif',
      'footerTitle':'Cricketer',
      'footerColor':'#c1d0cd',
      'footerFont': '12px sans-serif',
      'leftaxisColor': '#c1d0cd',
      'leftaxisFont': '12px sans-serif',
    }
  }
}
