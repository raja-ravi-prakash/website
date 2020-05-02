import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyRoutingModule } from './body-routing.module';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { AboutComponent } from './about/about.component';
import { BuildsComponent } from './builds/builds.component';
import { ReachmeComponent } from './reachme/reachme.component';

@NgModule({
  declarations: [HomeComponent, ViewComponent, AboutComponent, BuildsComponent, ReachmeComponent],
  imports: [CommonModule, BodyRoutingModule],
  exports: [ViewComponent],
})
export class BodyModule {}
