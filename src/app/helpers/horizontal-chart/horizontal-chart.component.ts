import {Component} from '@angular/core';
import {ChartComponent} from "../chart/chart.component";
import {DrawnBar} from "../chart/drawnBar";

@Component({
  selector: 'app-horizontal-chart',
  templateUrl: './horizontal-chart.component.html',
  styleUrls: ['./horizontal-chart.component.scss']
})
export class HorizontalChartComponent extends ChartComponent {

  public override refreshChart() {
    this.canvas.nativeElement.height = this.chartData.length * 80;
    this.context.fillStyle = '#fff';
    this.context.fillRect(0, 0, this.chartConfig.width, this.chartData.length * 80);

    this.canvas.nativeElement.onmousemove = this.onCanvasMouseMove();
    this.canvas.nativeElement.onmouseleave = this.onCanvasMouseLeave();

    super.refreshChart();
  }

  protected override drawBarChart() {

    const widthRatio = this.getWidthRatio();

    for (let index = 0; index < this.chartData.length; index++) {

      const drawBar = new DrawnBar(
        this.barPadding,
        25 + index * 80,
        this.chartData[index].value * widthRatio,
        this.barHeight,
        7,
        this.barColor
      );

      this.drawnBars.push(drawBar);

      this.context.fillStyle = this.barColor;

      this.roundRect(drawBar);

      this.addText(
        this.chartData[index].label,
        10,
        20 + index * 80
      );

      this.addText(
        this.chartData[index].valueToDisplay,
        this.barPadding + this.chartData[index].value * widthRatio + 10,
        45 + index * 80
      );
    }
  }

  protected override drawBar(drawnBar: DrawnBar) {
    this.context.beginPath();
    this.context.moveTo(drawnBar.x + drawnBar.radius, drawnBar.y);

    this.context.fillStyle = drawnBar.color;
    this.context.arcTo(drawnBar.x + drawnBar.width, drawnBar.y, drawnBar.x + drawnBar.width, drawnBar.y + drawnBar.height, drawnBar.radius);
    this.context.arcTo(drawnBar.x + drawnBar.width, drawnBar.y +drawnBar.height, drawnBar.x, drawnBar.y + drawnBar.height, drawnBar.radius);
    this.context.arcTo(drawnBar.x, drawnBar.y + drawnBar.height, drawnBar.x, drawnBar.y, 0);
    this.context.arcTo(drawnBar.x, drawnBar.y, drawnBar.x + drawnBar.width, drawnBar.y, 0);

    this.context.closePath();
    this.context.fill();
  }
}
