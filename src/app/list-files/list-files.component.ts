import {Component, ViewChild} from '@angular/core';
import {ChartData} from "../chart/chartData";
import {ChartComponent} from "../chart/chart.component";
import {HorizontalChartComponent} from "../horizontal-chart/horizontal-chart.component";
import {StorageService} from "../service/storage.service";
import {File} from "../models/file";
import {ListFilesArguments} from "../models/listFilesArguments";
import {ChartConfig} from "../chart/chartConfig";

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent {

  files: File[] = [];

  chartData: ChartData[] = [];
  chartConfig!: ChartConfig;

  @ViewChild(ChartComponent) chartComponent?:ChartComponent;
  @ViewChild(HorizontalChartComponent) horizontalChartComponent?:HorizontalChartComponent;

  constructor(private storageService: StorageService) {

    storageService.getFiles(this.getListFilesArguments()).subscribe(
      (files: File[]) => {
        for (let file of files) {
          this.files.push(new File(
            this.cleanFileName(file.path),
            file.size,
            this.getSizeToDisplay(file.size)
          ));
        }

        for (let file of this.files) {
          this.chartData?.push(new ChartData(
            file.size,
            file.path,
            file.sizeToDisplay
          ));
        }

        this.chartComponent?.refreshChart();
        this.horizontalChartComponent?.refreshChart();
      }
    );

    this.chartConfig = new ChartConfig(
      800, 600, '16px sans-serif', '#262626'
    );
  }

  cleanFileName(name: string): string {
    name = name.substring(name.lastIndexOf("/") + 1);
    name = name.substring(0, name.lastIndexOf("."));
    name = name.split('.').join(' ');

    return name;
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
