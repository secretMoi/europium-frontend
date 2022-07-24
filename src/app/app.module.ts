import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BarChartModule} from "@swimlane/ngx-charts";
import { ChartComponent } from './chart/chart.component';
import { ChartNgxLibComponent } from './chart-ngx-lib/chart-ngx-lib.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartNgxLibComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BarChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
