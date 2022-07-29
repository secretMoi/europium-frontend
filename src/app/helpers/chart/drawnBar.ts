export class DrawnBar {
  x!: number;
  y!: number;
  width!: number;
  height!: number;
  radius: number = 0;
  color!: string;

  constructor(x: number, y: number, width: number, height: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.radius = radius;
    this.color = color;
  }
}
