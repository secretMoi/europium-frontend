import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {BarChartModule} from "@swimlane/ngx-charts";
import { ChartComponent } from './chart/chart.component';
import { ChartNgxLibComponent } from './chart-ngx-lib/chart-ngx-lib.component';
import { HorizontalChartComponent } from './horizontal-chart/horizontal-chart.component';
import {ClrVerticalNavModule} from "@clr/angular";
import { VolumeListComponent } from './volume-list/volume-list.component';
import { ListFilesComponent } from './list-files/list-files.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartNgxLibComponent,
    HorizontalChartComponent,
    VolumeListComponent,
    ListFilesComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BarChartModule,
        ClrVerticalNavModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
