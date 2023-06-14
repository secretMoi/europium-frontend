export interface FileSystem {
  size: number;
  used: number;
  available: number;
  percentageUsed: string;
  volume: string;
	isLocal: boolean;
}
