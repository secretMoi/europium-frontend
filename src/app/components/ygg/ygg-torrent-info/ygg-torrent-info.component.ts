import {Component} from '@angular/core';
import {YggTorrentAccount} from "../../../models/ygg-torrent-account";
import {YggTorrentService} from "../../../service/ygg-torrent.service";

@Component({
  selector: 'app-ygg-torrent-info',
  templateUrl: './ygg-torrent-info.component.html',
  styleUrls: ['./ygg-torrent-info.component.scss']
})
export class YggTorrentInfoComponent {
	public yggTorrentAccount?: YggTorrentAccount;

	get up(): number {
		return this.yggTorrentAccount?.up ?? 0;
	}

	get down(): number {
		return this.yggTorrentAccount?.down ?? 0;
	}

  constructor(private _yggTorrentService: YggTorrentService) {
		this._yggTorrentService.getRatio().subscribe(accountInformation => this.yggTorrentAccount = accountInformation);
	}

}
