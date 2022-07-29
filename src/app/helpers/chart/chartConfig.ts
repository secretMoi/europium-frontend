export class ChartConfig {
  width: number;
  height: number;
  columnFont?: string;
  columnTitleColor?: string;


  constructor(width: number, height: number, columnFont?: string, columnTitleColor?: string) {
    this.width = width;
    this.height = height;
    this.columnFont = columnFont;
    this.columnTitleColor = columnTitleColor;
  }
}
