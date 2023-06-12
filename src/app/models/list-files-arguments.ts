import {FileType} from "./file-type";

export class ListFilesArguments {
  path: string;
  limit: number;
  fileType: FileType;
	isLocal: boolean;

  constructor(path: string, limit: number, fileType: FileType, isLocal: boolean) {
    this.path = path;
    this.limit = limit;
    this.fileType = fileType;
    this.isLocal = isLocal;
  }
}
