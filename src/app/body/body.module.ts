import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyRoutingModule } from './body-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { BuildsComponent } from './builds/builds.component';
import { ReachmeComponent } from './reachme/reachme.component';
import { ApiComponent } from './api/api.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ViewComponent } from './view/view.component';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatRippleModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  exports: [ViewComponent],
})
export class BodyModule {}
