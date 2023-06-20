import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ChartComponent} from './helpers/chart/chart.component';
import {HorizontalChartComponent} from './helpers/horizontal-chart/horizontal-chart.component';
import {VolumeListComponent} from './pages/volume-list/volume-list.component';
import {ListFilesComponent} from './pages/list-files/list-files.component';
import {FormsModule} from "@angular/forms";
import {HomeComponent} from './pages/home/home.component';
import {ApiMonitoredCardComponent} from './helpers/api-monitored-card/api-monitored-card.component';
import {HandleApiComponent} from './pages/handle-api/handle-api.component';
import {NgbCollapseModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CrudApisComponent} from './pages/crud-apis/crud-apis.component';
import {EditApiComponent} from './pages/edit-api/edit-api.component';
import {TorrentsListComponent} from './pages/torrents-list/torrents-list.component';
import {PaginationComponent} from './helpers/pagination/pagination.component';
import {TorrentCardComponent} from './helpers/torrent-card/torrent-card.component';
import {TruncatePipe} from "./pipes/truncate.pipe";
import {TorrentMetadataModalComponent} from './helpers/torrent-metadata-modal/torrent-metadata-modal.component';
import {MetadataElementComponent} from './helpers/torrent-metadata-modal/metadata-element/metadata-element.component';
import {ProgressBarComponent} from './helpers/progress-bar/progress-bar.component';
import {FormatFileSizePipe} from "./pipes/format-file-size.pipe";
import { YggTorrentInfoComponent } from './components/ygg-torrent-info/ygg-torrent-info.component';
import { YggSearchComponent } from './pages/ygg-search/ygg-search.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import {DateAgoPipe} from "./pipes/date-ago.pipe";

@NgModule({
	declarations: [
		AppComponent,
		ChartComponent,
		HorizontalChartComponent,
		VolumeListComponent,
		ListFilesComponent,
		HomeComponent,
		ApiMonitoredCardComponent,
		HandleApiComponent,
		CrudApisComponent,
		EditApiComponent,
		TorrentsListComponent,
		PaginationComponent,
		TorrentCardComponent,
		TruncatePipe,
		FormatFileSizePipe,
		DateAgoPipe,
		TorrentMetadataModalComponent,
		MetadataElementComponent,
		ProgressBarComponent,
  YggTorrentInfoComponent,
  YggSearchComponent,
  MainMenuComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		NgbCollapseModule,
		BrowserAnimationsModule,
		NgbModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
