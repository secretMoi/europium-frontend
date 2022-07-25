import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {VolumeListComponent} from "./volume-list/volume-list.component";
import {ListFilesComponent} from "./list-files/list-files.component";

const routes: Routes = [
  // { path: '', component: AppComponent }, // localhost:4200/users
  { path: 'volume-list', component: VolumeListComponent },
  { path: 'files-list', component: ListFilesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
