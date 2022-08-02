import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VolumeListComponent} from "./pages/volume-list/volume-list.component";
import {ListFilesComponent} from "./pages/list-files/list-files.component";
import {HomeComponent} from "./pages/home/home.component";
import {CrudApisComponent} from "./pages/crud-apis/crud-apis.component";
import {EditApiComponent} from "./pages/edit-api/edit-api.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'volume-list', component: VolumeListComponent},
  {path: 'files-list', component: ListFilesComponent},
  {path: 'api', component: CrudApisComponent},
  {path: 'api/edit/:name', component: EditApiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
