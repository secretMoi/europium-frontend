import {Injectable} from "@angular/core";
import {TorrentInfo} from "../models/torrent-info";
import {removeAllTextAfter, removeAllTextBetween} from "../helpers/utils/string";

@Injectable({
	providedIn: 'root'
})
export class CleaningDataService {
	convertEta(seconds: number): string {
		if (seconds == 8640000) return '0';

		let d = Math.floor(seconds / (3600 * 24));
		let h = Math.floor(seconds % (3600 * 24) / 3600);
		let m = Math.floor(seconds % 3600 / 60);
		let s = Math.floor(seconds % 60);

		let dDisplay = d > 0 ? d + 'j' : "";
		let hDisplay = h > 0 ? h + 'h' : "";
		let mDisplay = m > 0 ? m + 'm' : "";
		let sDisplay = s > 0 ? s + 's' : "";

		return dDisplay + hDisplay + mDisplay + sDisplay;
	}

	convertSpeed(speed: number): string {
		if (speed > 1000000) {
			return Math.round(speed / 1000000) + 'Mo/s';
		}

		if (speed > 1000) {
			return Math.round(speed / 1000) + 'ko/s';
		}

		return speed.toString();
	}

	cleanTorrentName(name: string, isMovie: boolean = false): string {
		name = removeAllTextAfter(name, 'MULTI');
		name = removeAllTextAfter(name, 'VOSTFR');
		name = removeAllTextAfter(name, 'TRUEFRENCH');
		name = removeAllTextAfter(name, new Date().getFullYear().toString());
		name = removeAllTextAfter(name, 'S0');
		name = removeAllTextAfter(name, 'S1');
		name = removeAllTextAfter(name, '(');
		name = removeAllTextAfter(name, 'SAISON');
		name = removeAllTextAfter(name, 'SEASON');
		name = removeAllTextAfter(name, '20');
		name = removeAllTextAfter(name, '19');
		name = removeAllTextBetween(name, '[', ']');

		if(isMovie && name.includes('.'))
			name = name.substring(0, name.lastIndexOf("."));

		name = name.split(".").join(" ").trim();

		return name;
	}

	getSizeToDisplay(size: number): string {
		const suffixes = ['o', 'Ko', 'Mo', 'Go', 'To'];
		const suffixIndex = Math.floor(Math.log(size) / Math.log(1024));
		const suffix = suffixes[suffixIndex];

		if (suffixIndex === 0) return `${size} ${suffix})`;

		let sizeInBytes = (size / (1024 ** suffixIndex)); // ** = exponentielle
		return `${sizeInBytes.toFixed(1)} ${suffix}`;
	}

	getProgressToDisplay(progress: number) {
		return Math.round(progress * 100 * 10) / 10;
	}

	getSeasonFromName(name: string): number {
		let seasonFound: RegExpMatchArray | null = name.toUpperCase().match('S[0-9][0-9]');
		let season: string;
		if (seasonFound) {
			season = seasonFound[0].substring(1);
			while (season.charAt(0) === '0')
				season = season.substring(1);

			return Number(season);
		}

		seasonFound = name.toUpperCase().match('SAISON [0-9]');
		season = '';
		if (seasonFound) {
			season = seasonFound[0].replace('SAISON ', '');

			return Number(season);
		}

		return Number(undefined);
	}

	getEpisodeFromName(name: string): number {
		let episodeFound: RegExpMatchArray | null = name.toUpperCase().match('E[0-9][0-9]');
		let episode: string = '';

		if (episodeFound) {
			episode = episodeFound[0].substring(1);
			while (episode.charAt(0) === '0')
				episode = episode.substring(1);
		}

		return Number(episode);
	}

	getSeasonAndEpisodeFromTorrent(torrent: TorrentInfo): string {
		let text: string = '';

		if (torrent.season && torrent.season > 0)
			text += 'Saison ' + torrent.season;
		if (torrent.episode && torrent.episode > 0)
			text += ' Episode ' + torrent.episode;

		return text;
	}

	cleanLanguages(languages: string): string {
		let languagesList = languages.split('/');
		let languagesKnown: string[] = [];

		for (let language of languagesList) {
			if (languagesKnown.indexOf(language) === -1)
				languagesKnown.push(language);
		}

		for(let i = 0; i < languagesKnown.length; i++) {
			if (languagesKnown[i] == 'fre')
				languagesKnown[i] = 'Français'

			if (languagesKnown[i] == 'eng')
				languagesKnown[i] = 'Anglais'
		}

		return languagesKnown.join(', ');
	}
}
