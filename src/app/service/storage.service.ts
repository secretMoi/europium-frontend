import { Injectable } from '@angular/core';
import {FileSystem} from "../models/fileSystem";
import data from "../../config.json";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ListFilesArguments} from "../models/listFilesArguments";
import {File} from "../models/file";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private http: HttpClient) {}

  getFileSystems(): Observable<FileSystem[]> {
    return this.http.get<FileSystem[]>(data.server.host + 'Storage/filesystems');
  }

  getFiles(listFilesArguments: ListFilesArguments): Observable<File[]> {
    return this.http.post<File[]>(data.server.host + 'Storage/files', listFilesArguments);
  }
}
