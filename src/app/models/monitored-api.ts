import {ApiUrl} from "./api-url";

export class MonitoredApi {
  id!: number;
  name!: string;
  logo!: string;
  url!: string;
  code!: string;

  apiUrls!: ApiUrl[];
}
