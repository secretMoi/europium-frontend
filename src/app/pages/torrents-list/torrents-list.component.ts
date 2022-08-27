import {Component, OnDestroy} from '@angular/core';
import {TorrentService} from "../../service/torrent.service";
import {TorrentInfo} from "../../models/torrent-info";
import {map, Subscription, timer} from "rxjs";
import {TheMovieDbService} from "../../service/the-movie-db.service";
import {CleaningDataService} from "../../service/cleaning-data.service";
import {ApiType} from "../../models/enums/api-type";
import {TorrentState} from "../../models/torrent-state";

@Component({
	selector: 'app-torrents-list',
	templateUrl: './torrents-list.component.html',
	styleUrls: ['./torrents-list.component.scss']
})
export class TorrentsListComponent implements OnDestroy {
	torrents!: TorrentInfo[];
	isFirstLoading = true;

	// torrent subscription
	timerSubscription!: Subscription;
	lastTimingSubscription!: number;
	numberOfRefresh: number = 0;
	maxNumberOfRefresh: number = 50;
	refreshTimingWhileDownloading: number = 1000;
	refreshTimingWithoutDownloading: number = 5000;

	// order
	lastSortedProperty!: string;
	sortOrder: number = 1;

	// filters
	searchTorrent!: string;
	selectedApi: string = ApiType.ANY;
	apiType = ApiType;

	constructor(
		private torrentService: TorrentService,
		private theMovieDbService: TheMovieDbService,
		public cleaningDataService: CleaningDataService,
	) {
		this.setTimerSubscription(1000);
	}

	setTimerSubscription(timing: number) {
		this.lastTimingSubscription = timing;

		this.timerSubscription = timer(0, timing).pipe(
			map(() => {
				this.refreshTorrentList();
			})
		).subscribe();
	}

	ngOnDestroy(): void {
		this.timerSubscription.unsubscribe();
	}

	setMediaData(medias: TorrentInfo[]) {
		for (let mediaToAdd of medias) {

			if (mediaToAdd.category === ApiType.RADARR) {
				this.getMovieData(mediaToAdd);
			} else if (mediaToAdd.category === ApiType.SONARR) {
				this.getSerieData(mediaToAdd);
			}
		}
	}

	addNewMedias(torrents: TorrentInfo[]) {
		let mediasToAdd = torrents.filter(o1 => !this.torrents.some(o2 => o1.hash === o2.hash));

		this.setMediaData(mediasToAdd);

		this.torrents = this.torrents.concat(mediasToAdd);
	}

	removeOldMedias(torrents: TorrentInfo[]) {
		let mediaToDelete = this.torrents.filter(o1 => !torrents.some(o2 => o1.hash === o2.hash));

		this.torrents = this.torrents.concat(mediaToDelete);
	}

	updateMedias(torrents: TorrentInfo[]) {
		this.torrents.forEach(torrent => {
			let updatedTorrent = torrents.find(t => t.hash === torrent.hash);

			if (!updatedTorrent) return;

			torrent.state = updatedTorrent.state;
			torrent.progress = updatedTorrent.progress;
			torrent.eta = updatedTorrent.eta;
			torrent.completion_on = updatedTorrent.completion_on;
			torrent.dlspeed = updatedTorrent.dlspeed;
			torrent.downloaded = updatedTorrent.downloaded;
		});
	}

	setPosterFromSeason(torrent: TorrentInfo) {
		if (!torrent.seasons || !torrent.season || !torrent.movie) return;

		let season = torrent.seasons.find(t => t.season_number === torrent.season);

		if (!season) return;

		let newPoster = season.poster_path;
		if (newPoster)
			torrent.movie.poster_path = newPoster;
	}

	refreshTorrentList() {
		this.torrentService.getAllTorrents().subscribe(
			(torrents) => {
				if (this.torrents) {
					this.addNewMedias(torrents);
					this.removeOldMedias(torrents);
					this.updateMedias(torrents);
				} else {
					this.setMediaData(torrents);
					this.torrents = torrents;

					torrents.forEach(torrent => {
						torrent.season = this.cleaningDataService.getSeasonFromName(torrent.name);
						torrent.episode = this.cleaningDataService.getEpisodeFromName(torrent.name);
					});
				}

				if (this.isFirstLoading) {
					for (let torrent of this.torrents) {
						torrent.originalName = torrent.name;
					}

					this.dynamicSort('added_on', true);
				} else {
					this.sortOrder *= -1;
					this.dynamicSort(this.lastSortedProperty);
					this.isFirstLoading = false;
				}

				this.limitNumberOfRefresh();
			}
		);
	}

	limitNumberOfRefresh() {
		this.numberOfRefresh++;
		if (this.numberOfRefresh > this.maxNumberOfRefresh) this.timerSubscription.unsubscribe();

		let hasDownloadingTorrent = this.torrents.findIndex(f => f.state === TorrentState.DOWNLOADING) != -1;
		if (hasDownloadingTorrent && this.lastTimingSubscription != this.refreshTimingWhileDownloading) {
			this.resetTimerSubscription(this.refreshTimingWhileDownloading);
		}
		if (!hasDownloadingTorrent && this.lastTimingSubscription != this.refreshTimingWithoutDownloading) {
			this.resetTimerSubscription(this.refreshTimingWithoutDownloading);
		}
	}

	resetTimerSubscription(interval: number) {
		this.timerSubscription.unsubscribe();
		this.setTimerSubscription(interval);
		this.numberOfRefresh = 0;
	}

	getMovieData(torrent: TorrentInfo) {
		this.theMovieDbService.getMovieByName(this.cleaningDataService.cleanTorrentName(torrent.name)).subscribe(
			(movie) => {
				if (movie === null) return;

				torrent.movie = movie;
				torrent.name = movie.title;
			}
		);
	}

	getSerieData(torrent: TorrentInfo) {
		this.theMovieDbService.getSerieByName(this.cleaningDataService.cleanTorrentName(torrent.name)).subscribe(
			(movie) => {
				if (movie === null) return;

				torrent.movie = movie;
				torrent.name = movie.title;
				torrent.seasons = movie.seasons;

				this.setPosterFromSeason(torrent);
			}
		);
	}

	dynamicSort(property: string, isFirstLoading?: boolean) {
		if (this.lastSortedProperty === property) {
			this.sortOrder *= -1;
		} else {
			this.sortOrder = 1;
		}

		this.lastSortedProperty = property;
		let sortOrder = this.sortOrder;

		if (isFirstLoading) {
			this.lastSortedProperty = '';
			this.sortOrder = -1;
			sortOrder = -1;
		}

		this.torrents.sort(function (a: any, b: any) {
			// works with strings and numbers
			let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		});
	}

	deleteTorrent(torrent: TorrentInfo) {
		this.torrentService.deleteTorrent(torrent.hash).subscribe(
			_ => {
				const index = this.torrents.indexOf(torrent, 0);
				if (index > -1) {
					this.torrents.splice(index, 1);
				}
			}
		);
	}

	isTorrentMatchFilters(torrent: TorrentInfo): boolean {
		return this.isTorrentMatchingFilterApiType(torrent) && this.isTorrentMatchingFilterName(torrent);
	}

	isTorrentMatchingFilterName(torrent: TorrentInfo): boolean {
		if (!this.searchTorrent || this.searchTorrent.trim() === '') return true;
		return torrent.name.toLowerCase().includes(this.searchTorrent.toLowerCase());
	}

	isTorrentMatchingFilterApiType(torrent: TorrentInfo): boolean {
		if (this.selectedApi === ApiType.ANY) return true;

		return torrent.category === this.selectedApi;
	}
}
