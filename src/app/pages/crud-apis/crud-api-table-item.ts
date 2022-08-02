import {SafeUrl} from "@angular/platform-browser";
import {MonitoredApi} from "../../models/monitored-api";

export class CrudApiTableItem {
  image!: SafeUrl;
  name!: string;
  code!: string;

  constructor(api: MonitoredApi) {
    this.name = api.name;
    this.code = api.code;
  }
}
