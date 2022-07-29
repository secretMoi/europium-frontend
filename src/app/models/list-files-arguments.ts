import {FileType} from "./file-type";

export class ListFilesArguments {
  path: string;
  limit: number;
  fileType: FileType;

  constructor(path: string, limit: number, fileType: FileType) {
    this.path = path;
    this.limit = limit;
    this.fileType = fileType;
  }
}
