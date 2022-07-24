import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements AfterViewInit {

  //getting the cricketers Information
  @Input() chartData?: any;
//getting the chart Meta data
  @Input() chartMetaInfo?: any;

  @ViewChild('chart', {static: false})
  private canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

  ngAfterViewInit() {
    //setting up the inital Context, Get the canvas element
    // const canvas = <HTMLCanvasElement>document.getElementById('chart');
    // getContext will return the rendering context using it we can call the different methods and properties for creating shapes
    //we will be sending this context throught the methods to implement any drawing
    this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    // this.context.canvas.getContext('2d');
    //To set up the inital background color for the drawing area
    // @ts-ignore
    this.context.fillStyle='#262a33';
    //fillRect will use the fillstyle color and starts from 0,0 position and draws a rectangle with the width and height provided in
    //metadata , This will set up the context will #262a33 backgound , on top of this we will start drawing.
    this.context.fillRect(0,0,this.chartMetaInfo.chartWidth,this.chartMetaInfo.chartHeight);
    //The below 4 functions , contain the logic of drawing the chart I will be explaining them in Steps sections
    this.drawBarChart();
    this.addTitleToChart();
    this.addFooterToChart();
    this.addHorizontalLines();
  }

  addTitleToChart(){
    this.context.font = this.chartMetaInfo.titleFont;
    this.context.fillStyle = this.chartMetaInfo.titleColor;
    this.context.fillText(this.chartMetaInfo.title,100,30);
  }

  addFooterToChart() {
    this.context.font = this.chartMetaInfo.footerFont;
    this.context.fillStyle = this.chartMetaInfo.footerColor;
    this.context.fillText(this.chartMetaInfo.footerTitle,this.chartMetaInfo.chartWidth/2,this.chartMetaInfo.chartHeight-10);
  }

  addColumnName(name: any, xpos: any, ypos: any){
    this.context.font = this.chartMetaInfo.columnFont;
    this.context.fillStyle = this.chartMetaInfo.columnTitleColor;
    this.context.fillText(name,xpos,ypos);
  }

  addHorizontalLines() {
    this.context.font = this.chartMetaInfo.leftaxisFont;
    this.context.fillStyle = this.chartMetaInfo.leftaxisColor;

    for(var i=0; i<11; i++) {

      this.context.lineWidth = 0.5;
      this.context.beginPath();
      this.context.moveTo(25,(20*i)+40);
      this.context.lineTo(475,(20*i)+40);
      this.context.strokeStyle  = this.chartMetaInfo.leftaxisColor;
      this.context.stroke();
    }
  }

  addColumnHead(name: any, xpos: any, ypos: any){
    this.context.font = this.chartMetaInfo.columnFont;
    this.context.fillStyle = this.chartMetaInfo.columnTitleColor;
    this.context.fillText(name,xpos,ypos);
  }



  drawBarChart(){

    for(let cricketer=0; cricketer<this.chartData.length; cricketer++) {
      this.context.fillStyle = "#36b5d8";
      let cricketerInfo = this.chartData[cricketer];
      // this.context.fillRect(25 + cricketer*100, this.chartMetaInfo.chartHeight-cricketerInfo['centuries']*2-60, 50, cricketerInfo['centuries']*2);
      this.roundRect(25 + cricketer*100, this.chartMetaInfo.chartHeight-cricketerInfo['centuries']*2-60, 50, cricketerInfo['centuries']*2, 10)
      this.addColumnName(cricketerInfo.name, 25 + cricketer*100, this.chartMetaInfo.chartHeight-40);
      this.addColumnHead(cricketerInfo['centuries'],45 + cricketer*100, this.chartMetaInfo.chartHeight-cricketerInfo['centuries']*2-65)
    }

  }

  roundRect(
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number = 5
  ) {
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    this.context.beginPath();

    this.context.moveTo(x + radius, y);

    this.context.arcTo(x + width, y, x + width, y + height, radius);
    this.context.arcTo(x + width, y + height, x, y + height, 0);
    this.context.arcTo(x, y + height, x, y, 0);
    this.context.arcTo(x, y, x + width, y, radius);

    this.context.closePath();
    this.context.fill();
  }

}
