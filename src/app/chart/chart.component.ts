import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ChartData} from "./chartData";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {

  @Input() chartData!: ChartData[];
  @Input() chartMetaInfo?: any;

  @ViewChild('chart', {static: false})
  protected canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
  protected context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  ngAfterViewInit() {

    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    this.context.fillStyle = '#262a33';
    this.context.fillRect(0, 0, this.chartMetaInfo.chartWidth, this.chartMetaInfo.chartHeight);

    // this.refreshChart();
  }

  public refreshChart() {
    this.drawBarChart();
    // this.addTitleToChart();
    // this.addFooterToChart();
    // this.addHorizontalLines();
  }

  protected addTitleToChart() {
    this.context.font = this.chartMetaInfo.titleFont;
    this.context.fillStyle = this.chartMetaInfo.titleColor;
    this.context.fillText(this.chartMetaInfo.title, 100, 30);
  }

  protected addFooterToChart() {
    this.context.font = this.chartMetaInfo.footerFont;
    this.context.fillStyle = this.chartMetaInfo.footerColor;
    this.context.fillText(this.chartMetaInfo.footerTitle, this.chartMetaInfo.chartWidth / 2, this.chartMetaInfo.chartHeight - 10);
  }

  protected addColumnName(name: any, xpos: any, ypos: any) {
    this.context.font = this.chartMetaInfo.columnFont;
    this.context.fillStyle = this.chartMetaInfo.columnTitleColor;
    this.context.fillText(name, xpos, ypos);
  }

  protected addHorizontalLines() {
    this.context.font = this.chartMetaInfo.leftaxisFont;
    this.context.fillStyle = this.chartMetaInfo.leftaxisColor;

    for (let i = 0; i < 11; i++) {

      this.context.lineWidth = 0.5;
      this.context.beginPath();
      this.context.moveTo(25, (20 * i) + 40);
      this.context.lineTo(475, (20 * i) + 40);
      this.context.strokeStyle = this.chartMetaInfo.leftaxisColor;
      this.context.stroke();
    }
  }

  protected addColumnHead(name: any, xpos: any, ypos: any) {
    this.context.font = this.chartMetaInfo.columnFont;
    this.context.fillStyle = this.chartMetaInfo.columnTitleColor;
    this.context.fillText(name, xpos, ypos);
  }


  protected drawBarChart() {

    const heightRatio = this.getHeightRatio();

    for (let index = 0; index < this.chartData.length; index++) {
      this.context.fillStyle = "#1266F1";

      this.roundRect(
        25 + index * 70,
        this.chartMetaInfo.chartHeight - this.chartData[index].value * heightRatio - 50,
        50,
        this.chartData[index].value * heightRatio, 7
      );

      this.addColumnName(
        this.chartData[index].label,
        25 + index * 70,
        this.chartMetaInfo.chartHeight - 40
      );

      this.addColumnHead(
        this.chartData[index].valueToDisplay,
        45 + index * 70,
        this.chartMetaInfo.chartHeight - this.chartData[index].value - 65
      );
    }
  }

  protected getHeightRatio(): number {

    const maxValue = Math.max(...this.chartData.map(chartItem => chartItem.value));
    this.chartData.sort((a, b) => a.value - b.value).reverse();

    let heightRatio;
    if (maxValue > this.chartMetaInfo.height) {
      heightRatio = maxValue / this.chartMetaInfo.chartHeight;
    } else {
      heightRatio = (this.chartMetaInfo.chartHeight - 90) / maxValue;
    }

    return heightRatio;
  }

  protected getWidthRatio(): number {

    this.chartData.sort((a, b) => a.value - b.value).reverse();
    const maxValue = this.chartData[0].value;

    const widthRatio = (this.chartMetaInfo.chartWidth - 90) / maxValue;

    return widthRatio;
  }

  protected roundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number = 0
  ) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;

    this.context.beginPath();

    this.context.moveTo(x + radius, y);

    this.makeBorderRadius(x, y, width, height, radius);

    this.context.closePath();
    this.context.fill();
  }

  protected makeBorderRadius(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number = 0
  ) {
    this.context.arcTo(x + width, y, x + width, y + height, radius);
    this.context.arcTo(x + width, y + height, x, y + height, 0);
    this.context.arcTo(x, y + height, x, y, 0);
    this.context.arcTo(x, y, x + width, y, radius);
  }

}
