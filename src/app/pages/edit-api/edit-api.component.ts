import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MonitoredApi} from "../../models/monitored-api";
import {ApiUrl} from "../../models/api-url";

@Component({
  selector: 'app-edit-api',
  templateUrl: './edit-api.component.html',
  styleUrls: ['./edit-api.component.scss']
})
export class EditApiComponent implements OnInit {

  api!: MonitoredApi;

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((data) => {
      console.log(this.route.snapshot.params['name']);
    });

    // if(this.route.snapshot.paramMap.get('name')) {
    //
    // } else {
      this.api = new MonitoredApi();
      this.api.apiUrls = [];
      this.api.apiUrls.push(new ApiUrl());
    // }
  }

  addApiUrl() {
    this.api.apiUrls.push(new ApiUrl());
  }

  removeApiUrl(index: number) {
    this.api.apiUrls.splice(index, 1);
  }
}
