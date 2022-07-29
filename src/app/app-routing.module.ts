import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {VolumeListComponent} from "./pages/volume-list/volume-list.component";
import {ListFilesComponent} from "./pages/list-files/list-files.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'volume-list', component: VolumeListComponent },
  { path: 'files-list', component: ListFilesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
