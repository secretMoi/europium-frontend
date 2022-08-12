export class TorrentInfo {
  name?: string;
  category?: string;
  state?: string;
  size?: number;
  progress?: number
  eta?: number;
  completion_on?: number;
  completed?: number;
  downloaded?: number;
  dlspeed?: number;
  total_size?: number;
  save_path?: string;
}
