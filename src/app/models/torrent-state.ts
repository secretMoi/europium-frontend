export enum TorrentState {
	ANY = 'ANY',
	RUNNING = 'RUNNING',
	FINISHED = 'FINISHED',

	DOWNLOADING = 'downloading',
	PAUSE_UPLOAD = 'pausedUP',
	PAUSE_DOWNLOAD = 'pausedDL',
	UPLOADING = 'uploading',
	QUEUED_DOWNLOAD = 'queuedDL',
	ERROR = 'error',
	MISSING_FILE = 'missingFiles',
}
