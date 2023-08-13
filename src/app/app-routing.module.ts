import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VolumeListComponent} from "./pages/volume-list/volume-list.component";
import {ListFilesComponent} from "./pages/list-files/list-files.component";
import {HomeComponent} from "./pages/home/home.component";
import {CrudApisComponent} from "./pages/crud-apis/crud-apis.component";
import {EditApiComponent} from "./pages/edit-api/edit-api.component";
import {TorrentsListComponent} from "./pages/torrents-list/torrents-list.component";
import {YggSearchComponent} from "./pages/ygg-search/ygg-search.component";
import {PlexComponent} from "./pages/plex/plex.component";
import {LoginPage} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
	{path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
	{path: 'volume-list', component: VolumeListComponent, canActivate: [AuthGuard]},
	{path: 'files-list', component: ListFilesComponent, canActivate: [AuthGuard]},
	{path: 'api', component: CrudApisComponent, canActivate: [AuthGuard]},
	{path: 'api/create', component: EditApiComponent, canActivate: [AuthGuard]},
	{path: 'api/edit/:code', component: EditApiComponent, canActivate: [AuthGuard]},
	{path: 'torrent/list', component: TorrentsListComponent, canActivate: [AuthGuard]},
	{path: 'ygg/search', component: YggSearchComponent, canActivate: [AuthGuard]},
	{path: 'plex', component: PlexComponent, canActivate: [AuthGuard]},
	{path: 'login', component: LoginPage},
	{path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
