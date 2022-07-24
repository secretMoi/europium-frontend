import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileSystem} from "./fileSystem";
import data from '../config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fileSystems?: FileSystem[];

  //object contains the name,centures of the cricketers this is the data we will use to draw the chart
  cricketersInfo?;
  //meta Info object holds lot of properties describes the title and color and othe meta info for chart
  metaInfo?;

  constructor(private http: HttpClient) {

    //adding data
    this.cricketersInfo = [
      {'name':'Sachin T','centuries':49},
      {'name':'Kohli  V','centuries':43},
      {'name':'Rohit  S','centuries':28},
      {'name':' Ganguly ','centuries':22},
      {'name':'Dhawan','centuries':17},
    ];

    //Metadata for the chart like width and height of the chart, Title for the chart, Title color etc..
    this.metaInfo = {
      'chartWidth':'500',
      'chartHeight': '300',
      'title':'Indian cricketers with Most Centuries',
      'titleColor':'white',
      'titleFont': '20px sans-serif',
      'columnTitleColor': 'white',
      'columnFont': '12px sans-serif',
      'footerTitle':'Cricketer',
      'footerColor':'#c1d0cd',
      'footerFont': '12px sans-serif',
      'leftaxisColor': '#c1d0cd',
      'leftaxisFont': '12px sans-serif',
    }
  }

  ngOnInit(): void {
    this.http.get<FileSystem[]>(data.server.host + 'Storage').subscribe(
      (fileSystems: FileSystem[]) => this.fileSystems = fileSystems
    );
  }
}
