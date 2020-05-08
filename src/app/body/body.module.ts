import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyRoutingModule } from './body-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BuildsComponent } from './builds/builds.component';
import { ReachmeComponent } from './reachme/reachme.component';
import { ApiComponent } from './api/api.component';
import { LottieModule } from 'ngx-lottie';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ViewComponent } from './view/view.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    BuildsComponent,
    ReachmeComponent,
    ApiComponent,
    ViewComponent,
  ],
  imports: [
    CommonModule,
    BodyRoutingModule,
    LottieModule.forRoot({ player: playerFactory, useCache: true }),
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
  ],
  exports: [ViewComponent],
})
export class BodyModule {}
