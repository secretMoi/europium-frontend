import { Component } from '@angular/core';
import {ChartComponent} from "../chart/chart.component";

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss']
})
export class HorizontalChartComponent extends ChartComponent {

  public override refreshChart() {
    this.canvas.nativeElement.height = this.chartData.length * 80;
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.chartMetaInfo.chartWidth, this.chartData.length * 80);

    super.refreshChart();
  }

  protected override drawBarChart() {

    const widthRatio = this.getWidthRatio();

    const barPadding = 20;
    const barHeight = 30;

    for (let index = 0; index < this.chartData.length; index++) {
      this.context.fillStyle = "#1266F1";

      this.roundRect(
        barPadding,
      25 + index * 80,
      this.chartData[index].value * widthRatio,
        barHeight,
      7
      );

      this.addColumnName(
        this.chartData[index].label,
        10,
        20 + index * 80
      );

      this.addColumnHead(
        this.chartData[index].valueToDisplay,
        barPadding + this.chartData[index].value * widthRatio + 10,
        45 + index * 80
      );
    }
  }

  protected override makeBorderRadius(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number = 0
  ) {
    this.context.arcTo(x + width, y, x + width, y + height, radius);
    this.context.arcTo(x + width, y + height, x, y + height, radius);
    this.context.arcTo(x, y + height, x, y, 0);
    this.context.arcTo(x, y, x + width, y, 0);
  }

}
