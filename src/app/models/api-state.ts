export class ApiState {
  code!: string;
  url!: string;

  constructor(code: string, url: string) {
    this.code = code;
    this.url = url;
  }
}
