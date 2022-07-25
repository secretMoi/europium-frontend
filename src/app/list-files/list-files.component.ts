import {Component, ViewChild} from '@angular/core';
import {ChartData} from "../chart/chartData";
import {ChartComponent} from "../chart/chart.component";
import {HorizontalChartComponent} from "../horizontal-chart/horizontal-chart.component";
import {StorageService} from "../service/storage.service";
import {File} from "../models/file";
import {ListFilesArguments} from "../models/listFilesArguments";

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent {

  files?: File[];

  chartData: ChartData[] = [];
  metaInfo?;

  @ViewChild(ChartComponent) chartComponent?:ChartComponent;
  @ViewChild(HorizontalChartComponent) horizontalChartComponent?:HorizontalChartComponent;

  constructor(private storageService: StorageService) {

    storageService.getFiles(this.getListFilesArguments()).subscribe(
      (files: File[]) => {
        this.files = files;

        for (let file of files) {
          this.chartData?.push(new ChartData(
            file.size,
            file.path,
            this.getSizeToDisplay(file.size)
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

  getSizeToDisplay(size: number): string {
    if(size > 1000000) {
      return Math.round(size / 10000) / 100 + 'Go';
    }

    if(size > 1000) {
      return Math.round(size / 10) / 100 + 'Mo';
    }

    return size.toString();
  }

  getListFilesArguments() {
    return new ListFilesArguments('/volumeUSB1/usbshare/', 50, 1);
  }

}
