import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LottieModule } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { NamePlateComponent } from './name-plate/name-plate.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { BodyModule } from './body/body.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, NamePlateComponent],
  imports: [
    LottieModule.forRoot({ player: playerFactory, useCache: true }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatRippleModule,
    BodyModule,
    GraphQLModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
