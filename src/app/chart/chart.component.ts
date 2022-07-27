import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {ChartData} from "./chartData";
import {ChartConfig} from "./chartConfig";
import {DrawnBar} from "./drawnBar";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {

  @Input() chartData!: ChartData[];
  @Input() chartConfig!: ChartConfig;

  @ViewChild('chart', {static: false})
  protected canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
  protected context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  protected drawnBars: DrawnBar[] = [];
  protected barHighlighted?: DrawnBar;

  protected barPadding: number = 10;
  protected barHeight: number = 30;
  protected barColor: string = 'rgba(18, 102, 241, 0.5)';
  protected highlightedBarColor: string = 'rgba(18, 102, 241, 1)';

  ngAfterViewInit() {

    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

    this.context.fillStyle = '#262a33';
    this.context.fillRect(0, 0, this.chartConfig.width, this.chartConfig.height);
  }

  public refreshChart() {
    this.drawBarChart();
  }

  protected addColumnName(name: any, xpos: any, ypos: any) {
    this.context.font = <string> this.chartConfig.columnFont;
    this.context.fillStyle = <string> this.chartConfig.columnTitleColor;
    this.context.fillText(name, xpos, ypos);
  }

  protected addColumnHead(name: any, xpos: any, ypos: any) {
    this.context.font = <string>this.chartConfig.columnFont;
    this.context.fillStyle = <string>this.chartConfig.columnTitleColor;
    this.context.fillText(name, xpos, ypos);
  }


  protected drawBarChart() {

    const heightRatio = this.getHeightRatio();

    for (let index = 0; index < this.chartData.length; index++) {
      this.context.fillStyle = this.barColor;

      const drawBar = new DrawnBar(
        25 + index * 70,
        this.chartConfig.height - this.chartData[index].value * heightRatio - 50,
        50,
        this.chartData[index].value * heightRatio,
        7,
        this.barColor
      );

      this.roundRect(drawBar);

      this.addColumnName(
        this.chartData[index].label,
        25 + index * 70,
        this.chartConfig.height - 40
      );

      this.addColumnHead(
        this.chartData[index].valueToDisplay,
        45 + index * 70,
        this.chartConfig.height - this.chartData[index].value - 65
      );
    }
  }

  protected getHeightRatio(): number {

    const maxValue = Math.max(...this.chartData.map(chartItem => chartItem.value));
    this.chartData.sort((a, b) => a.value - b.value).reverse();

    let heightRatio;
    if (maxValue > this.chartConfig.height) {
      heightRatio = maxValue / this.chartConfig.height;
    } else {
      heightRatio = (this.chartConfig.height - 90) / maxValue;
    }

    return heightRatio;
  }

  protected getWidthRatio(): number {

    this.chartData.sort((a, b) => a.value - b.value).reverse();
    const maxValue = this.chartData[0].value;

    return (this.chartConfig.width - 100) / maxValue;
  }

  protected roundRect(drawnBar: DrawnBar) {
    if (drawnBar.width < 2 * drawnBar.radius) drawnBar.radius = drawnBar.width / 2;
    if (drawnBar.height < 2 * drawnBar.radius) drawnBar.radius = drawnBar.height / 2;

    this.drawBar(drawnBar);
  }

  protected drawBar(drawnBar: DrawnBar) {
    this.context.beginPath();
    this.context.moveTo(drawnBar.x + drawnBar.radius, drawnBar.y);

    this.context.arcTo(drawnBar.x + drawnBar.width, drawnBar.y, drawnBar.x +drawnBar.width, drawnBar.y + drawnBar.height, drawnBar.radius);
    this.context.arcTo(drawnBar.x + drawnBar.width, drawnBar.y + drawnBar.height, drawnBar.x, drawnBar.y + drawnBar.height, 0);
    this.context.arcTo(drawnBar.x, drawnBar.y + drawnBar.height, drawnBar.x, drawnBar.y, 0);
    this.context.arcTo(drawnBar.x, drawnBar.y, drawnBar.x + drawnBar.width, drawnBar.y, drawnBar.radius);

    this.context.closePath();
    this.context.fill();
  }

  protected redrawBar(drawnBar: DrawnBar, barColor: string) {
    drawnBar.color = barColor;
    this.context.clearRect(drawnBar.x, drawnBar.y, drawnBar.width, drawnBar.height);
    this.drawBar(drawnBar);
  }

}
