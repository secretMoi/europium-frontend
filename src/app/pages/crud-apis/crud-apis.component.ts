import {Component, OnInit} from '@angular/core';
import {MonitoredApiService} from "../../service/monitored-api.service";
import {DomSanitizer} from "@angular/platform-browser";
import {CrudApiTableItem} from "./crud-api-table-item";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-crud-apis',
  templateUrl: './crud-apis.component.html',
  styleUrls: ['./crud-apis.component.scss']
})
export class CrudApisComponent implements OnInit {

  apis: CrudApiTableItem[] = [];

  constructor(
    private monitoredApiService: MonitoredApiService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.monitoredApiService.getMonitoredApis().subscribe(
      (monitoredApis) => {
        for (const api of monitoredApis) {
          this.apis.push(new CrudApiTableItem(api));
          this.updateApiLogo(this.apis[this.apis.length - 1]);
        }
      }
    );
  }

  updateApiLogo(api: CrudApiTableItem) {
    this.monitoredApiService.getApiLogo(api.code).subscribe(
      (blobImage: any) => api.image = this.sanitizer.bypassSecurityTrustUrl(blobImage)
    );
  }

  onApiSelected(api: CrudApiTableItem) {
    this.router.navigate(['edit', api.code], {relativeTo: this.activatedRoute});
  }
}
