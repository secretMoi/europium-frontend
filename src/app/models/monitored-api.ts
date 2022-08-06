import {ApiUrl} from "./api-url";
import {SafeUrl} from "@angular/platform-browser";

export class MonitoredApi {
  id!: number;
  name!: string;
  logo!: string | SafeUrl;
  url!: string;
  code!: string;
  apiKey!: string;

  apiUrls!: ApiUrl[];
}
