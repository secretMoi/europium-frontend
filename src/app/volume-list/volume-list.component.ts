import {Component, ViewChild} from '@angular/core';
import {FileSystem} from "../models/file-system";
import {ChartData} from "../chart/chartData";
import {ChartComponent} from "../chart/chart.component";
import {HorizontalChartComponent} from "../horizontal-chart/horizontal-chart.component";
import {StorageService} from "../service/storage.service";
import {ChartConfig} from "../chart/chartConfig";

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html',
  styleUrls: ['./volume-list.component.scss']
})
export class VolumeListComponent {

  fileSystems?: FileSystem[];

  chartData: ChartData[] = [];
  chartConfig!: ChartConfig;

  @ViewChild(ChartComponent) chartComponent?:ChartComponent;
  @ViewChild(HorizontalChartComponent) horizontalChartComponent?:HorizontalChartComponent;

  constructor(private storageService: StorageService) {

    storageService.getFileSystems().subscribe(
      (fileSystems: FileSystem[]) => {
        this.fileSystems = fileSystems;

        for(let fileSystem of fileSystems) {
          this.chartData?.push(new ChartData(
            this.multiplySizeBySuffix(fileSystem.size),
            fileSystem.volume,
            fileSystem.size
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

  multiplySizeBySuffix(size: string): number {
    const sizeAsNumber: number = this.convertStringToNumber(size);

    if (size.includes('T')) {
      return sizeAsNumber * 1000000000;
    }
    if (size.includes('G')) {
      return sizeAsNumber * 1000000;
    }

    return 0;
  }

  convertStringToNumber(text: string): number {
    return +text.replace(/[^\d.-]/g,'');
  }
}
