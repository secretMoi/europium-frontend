import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VolumeListComponent} from "./pages/volume-list/volume-list.component";
import {ListFilesComponent} from "./pages/list-files/list-files.component";
import {HomeComponent} from "./pages/home/home.component";
import {CrudApisComponent} from "./pages/crud-apis/crud-apis.component";
import {EditApiComponent} from "./pages/edit-api/edit-api.component";
import {TorrentsListComponent} from "./pages/torrents-list/torrents-list.component";
import {YggSearchComponent} from "./pages/ygg-search/ygg-search.component";

const routes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'volume-list', component: VolumeListComponent},
	{path: 'files-list', component: ListFilesComponent},
	{path: 'api', component: CrudApisComponent},
	{path: 'api/create', component: EditApiComponent},
	{path: 'api/edit/:code', component: EditApiComponent},
	{path: 'torrent/list', component: TorrentsListComponent},
	{path: 'ygg/search', component: YggSearchComponent},
	{path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
