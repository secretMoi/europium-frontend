export class File {
  path!: string;
  size!: number;
  sizeToDisplay?: string;

  constructor(path: string, size: number, sizeToDisplay?: string) {
    this.path = path;
    this.size = size;
    this.sizeToDisplay = sizeToDisplay;
  }
}
