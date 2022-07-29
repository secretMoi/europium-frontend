import {Component, ViewChild} from '@angular/core';
import {ChartData} from "../../helpers/chart/chartData";
import {HorizontalChartComponent} from "../../helpers/horizontal-chart/horizontal-chart.component";
import {StorageService} from "../../service/storage.service";
import {File} from "../../models/file";
import {ListFilesArguments} from "../../models/list-files-arguments";
import {ChartConfig} from "../../helpers/chart/chartConfig";
import {FileType} from "../../models/file-type";
import {FileSystem} from "../../models/file-system";

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent {
  defaultResultNumber: number = 50;
  defaultVolume: string = '/volumeUSB1/usbshare';

  files: File[] = [];

  chartData: ChartData[] = [];
  chartConfig!: ChartConfig;

  fileSystems!: FileSystem[];

  fileOrFolderText!: string;

  isFile: boolean = true;
  resultNumber?: number = this.defaultResultNumber;
  selectedVolume?: string = this.defaultVolume;

  @ViewChild(HorizontalChartComponent) horizontalChartComponent?:HorizontalChartComponent;

  constructor(public storageService: StorageService) {
    this.displayFileOrFolderText();

    this.getVolumes();
    this.loadData(this.getListFilesArguments());

    this.chartConfig = new ChartConfig(
      800, 600, '16px sans-serif', '#262626'
    );
  }

  getVolumes() {
    this.storageService.getFileSystems().subscribe(
      (volumes: FileSystem[]) => this.fileSystems = volumes
    );
  }

  loadData(listFilesArguments: ListFilesArguments) {
    this.storageService.getFiles(listFilesArguments).subscribe(
      (files: File[]) => {
        this.files.splice(0, this.files.length);
        this.chartData.splice(0, this.chartData.length);

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

        this.horizontalChartComponent?.refreshChart();
      },
      _ => console.error('error')
    );
  }

  cleanFileName(name: string): string {
    if (this.isFile) {
      name = name.substring(name.lastIndexOf("/") + 1);
      name = name.substring(0, name.lastIndexOf("."));
      name = name.split('.').join(' ');
    }

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
    return new ListFilesArguments(this.defaultVolume, this.defaultResultNumber, 1);
  }

  toggleIsFileValue() {
    this.isFile = !this.isFile;

    this.displayFileOrFolderText();
  }

  displayFileOrFolderText() {
    if(this.isFile) {
      this.fileOrFolderText = 'Fichier';
    } else {
      this.fileOrFolderText = 'Dossier';
    }
  }

  sendFilter() {
    const fileType = this.isFile ? FileType.File : FileType.Folder;
    const resultNumber = this.resultNumber ? this.resultNumber : this.defaultResultNumber;
    const volume = this.selectedVolume ? this.selectedVolume : this.defaultVolume;

    this.loadData(new ListFilesArguments(volume, resultNumber, fileType));
  }
}