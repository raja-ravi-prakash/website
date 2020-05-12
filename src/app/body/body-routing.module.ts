import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BuildsComponent } from './builds/builds.component';
import { ReachmeComponent } from './reachme/reachme.component';
import { ApiComponent } from './api/api.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  { path: 'builds', pathMatch: 'full', component: BuildsComponent },
  { path: 'reachme', pathMatch: 'full', component: ReachmeComponent },
  { path: 'api', pathMatch: 'full', component: ApiComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class BodyRoutingModule {}
