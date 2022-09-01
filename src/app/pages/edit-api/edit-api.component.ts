import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MonitoredApi} from "../../models/monitored-api";
import {ApiUrl} from "../../models/api-url";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {MonitoredApiService} from "../../service/monitored-api.service";

@Component({
  selector: 'app-edit-api',
  templateUrl: './edit-api.component.html',
  styleUrls: ['./edit-api.component.scss']
})
export class EditApiComponent implements OnInit {

  api!: MonitoredApi;
  logoData!: string | SafeUrl;
  isAlertDisplayed: boolean = false;
	apiCode!: string | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private apiService: MonitoredApiService,
  ) {

    this.api = new MonitoredApi();
    this.logoData = '/assets/interrogation-blue.svg';
    this.api.apiUrls = [];
    this.api.apiUrls.push(new ApiUrl());

    // this.router.events.subscribe((data) => {
    //   console.log(this.route.snapshot.params['name']);
    // });

    this.apiCode = this.route.snapshot.paramMap.get('code');
    if(this.apiCode) {
      this.apiService.getApiByCode(this.apiCode).subscribe(
        (api: MonitoredApi) => {
          this.api = api;
          this.apiService.getApiLogo(<string>this.apiCode).subscribe(
            (blobImage: any) => this.logoData = this.sanitizer.bypassSecurityTrustUrl(blobImage)
          )
        }
      );
    }
  }

  ngOnInit(): void {
  }

  addApiUrl() {
    this.api.apiUrls.push(new ApiUrl());
  }

  removeApiUrl(index: number) {
    this.api.apiUrls.splice(index, 1);
  }

  updateImage(ev: any) {
    // console.log(ev.target.files[0])
    // this.api.logo = <string>this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(ev.target.files[0]));
    this.api.logo = ev.target.files[0].name;

    this.logoData = this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(ev.target.files[0])
    );
  }

  saveApi() {
		this.apiService.saveApi(this.api).subscribe(
			_ => this.router.navigate(['/api']),
			_ => this.isAlertDisplayed = true
		);
  }

  cancelApi() {
    this.router.navigate(['/api']);
  }

  maskDisplayAlert() {
    this.isAlertDisplayed = false;
  }
}
