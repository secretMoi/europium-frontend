import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import {YggSearchComponent} from './pages/ygg-search/ygg-search.component';
import {MainMenuComponent} from './components/main-menu/main-menu.component';
import {DateAgoPipe} from "./pipes/date-ago.pipe";
import {YggTorrentInfoComponent} from "./components/ygg/ygg-torrent-info/ygg-torrent-info.component";
import {SortMenuComponent} from './components/ui/sort-menu/sort-menu.component';
import {YggTorrentCardComponent} from './components/ygg/ygg-torrent-card/ygg-torrent-card.component';
import {NotificationComponent} from './components/ui/notification/notification.component';
import {PlexComponent} from './pages/plex/plex.component';
import {SingleDataCardComponent} from './components/ui/single-data-card/single-data-card.component';
import {MultipleDataCardComponent} from './components/ui/multiple-data-card/multiple-data-card.component';
import {MillisToTimePipe} from "./pipes/millis-to-time.pipe";
import {ModalComponent} from './components/ui/modal/modal.component';
import {PlexDuplicateItemComponent} from './components/plex/plex-duplicate-item/plex-duplicate-item.component';
import {HorizontalButtonsComponent} from './components/ui/horizontal-buttons/horizontal-buttons.component';
import {SvgComponent} from './components/ui/svg/svg.component';
import {BottomSheetComponent} from './components/ui/bottom-sheet/bottom-sheet.component';
import {StopPropagationDirective} from "./directives/stop-propagation.directive";
import {PlexHistoryComponent} from './components/plex/plex-history/plex-history.component';
import {PlexHistoryItemComponent} from './components/plex/plex-history-item/plex-history-item.component';
import {CacheInterceptor} from "./interceptors/cache.interceptor";
import {MediaPosterHeaderComponent} from './components/ui/media-poster-header/media-poster-header.component';
import {
	PlexPlayingMediaItemComponent
} from './components/plex/plex-playing-media-item/plex-playing-media-item.component';
import {PlexPlayingMediasComponent} from "./components/plex/plex-playing-medias/plex-playing-medias.component";
import {FilterContainerComponent} from './components/ui/filter-container/filter-container.component';
import {FormSelectComponent} from './components/ui/form/form-select/form-select.component';
import {SearchFieldComponent} from './components/ui/form/search-field/search-field.component';
import {YggSearchFiltersComponent} from "./components/ygg/ygg-search-filters/ygg-search-filters.component";
import {TorrentsFiltersComponent} from './components/torrents/torrents-filters/torrents-filters.component';
import {ImageLoaderComponent} from './components/ui/image-loader/image-loader.component';
import {PlexDuplicatesComponent} from './components/plex/plex-duplicates/plex-duplicates.component';
import {LoginPage} from './pages/login-page/login-page.component';
import {AuthInterceptor} from "./interceptors/auth.interceptor";

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
		MillisToTimePipe,
		TorrentMetadataModalComponent,
		MetadataElementComponent,
		ProgressBarComponent,
		YggTorrentInfoComponent,
		YggSearchComponent,
		MainMenuComponent,
		YggSearchFiltersComponent,
		SortMenuComponent,
		YggTorrentCardComponent,
		NotificationComponent,
		PlexComponent,
		PlexPlayingMediasComponent,
		SingleDataCardComponent,
		MultipleDataCardComponent,
		ModalComponent,
		PlexDuplicateItemComponent,
		HorizontalButtonsComponent,
		SvgComponent,
		BottomSheetComponent,
		StopPropagationDirective,
		PlexHistoryComponent,
		PlexHistoryItemComponent,
		MediaPosterHeaderComponent,
		PlexPlayingMediaItemComponent,
		FilterContainerComponent,
		FormSelectComponent,
		SearchFieldComponent,
		TorrentsFiltersComponent,
		ImageLoaderComponent,
		PlexDuplicatesComponent,
		LoginPage
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
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: CacheInterceptor,
			multi: true
		},
		{ provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
