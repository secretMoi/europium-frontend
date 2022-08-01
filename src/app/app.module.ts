import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ChartComponent} from './helpers/chart/chart.component';
import {HorizontalChartComponent} from './helpers/horizontal-chart/horizontal-chart.component';
import {ClrDatagridModule, ClrInputModule, ClrVerticalNavModule} from "@clr/angular";
import {VolumeListComponent} from './pages/volume-list/volume-list.component';
import {ListFilesComponent} from './pages/list-files/list-files.component';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from './pages/home/home.component';
import {ApiMonitoredCardComponent} from './helpers/api-monitored-card/api-monitored-card.component';
import {HandleApiComponent} from './pages/handle-api/handle-api.component';
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HorizontalChartComponent,
    VolumeListComponent,
    ListFilesComponent,
    HomeComponent,
    ApiMonitoredCardComponent,
    HandleApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClrVerticalNavModule,
    ClrDatagridModule,
    FormsModule,
    ClrInputModule,
    NgbCollapseModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
