import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {VolumeListComponent} from "./volume-list/volume-list.component";

const routes: Routes = [
  // { path: '', component: AppComponent }, // localhost:4200/users
  { path: 'volume-list', component: VolumeListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
