import { Component, AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { CallServiceService } from '../services/call-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          left: '0vw',
        })
      ),
      state(
        'closed',
        style({
          left: '-55vw',
        })
      ),
      transition('open => closed', [animate('0.2s ease-out')]),
      transition('closed => open', [animate('0.2s ease-in')]),
    ]),
  ],
})
export class HeaderComponent implements AfterViewInit {
  isTop = true;
  ismenu = false;
  items: Array<String> = ['Home', 'Builds', 'API', 'Reach Me', 'About'];
  state: String = 'play_circle_outline';
  musicLabel = 'Play';

  constructor(
    public route: Router,
    public call: CallServiceService,
    public dialog: MatDialog
  ) {
    this.openDialog();
    ob.subscribe((val) => {
      this.state = 'pause_circle_outline';
      this.musicLabel = 'Pause';
    });
    audio.paused ? (this.musicLabel = 'Play') : (this.musicLabel = 'Pause');
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    var top = document.getElementsByTagName('html')[0].scrollTop;
    top == 0 ? (this.isTop = true) : (this.isTop = false);
  }

  music = function () {
    if (this.state == 'play_circle_outline') {
      this.state = 'pause_circle_outline';
      this.musicLabel = 'Pause';
    } else {
      this.state = 'play_circle_outline';
      this.musicLabel = 'Play';
    }

    musicState();
  };

  stop() {
    audio.currentTime = 0;
    audio.pause();
    this.state = 'play_circle_outline';
    this.musicLabel = 'Play';
  }

  options: AnimationOptions = {
    path: '/assets/logo.json',
  };

  menu() {
    this.ismenu = !this.ismenu;
  }

  menuAction(item: String) {
    window.scrollTo(0, 0);
    this.route.navigate([item.toLocaleLowerCase().split(/\s/).join('')]);
    this.call.send(item);
    this.menu();
  }
  menuToogle(item: String) {
    this.route.navigate([item.toLocaleLowerCase().split(/\s/).join('')]);
    this.call.send(item);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {});

    dialogRef.afterClosed().subscribe((result) => {
      // console.log('The dialog was closed');
    });
  }

  ngAfterViewInit(): void {}
}

const audio = new Audio();
audio.src = '/assets/rdj.mp3';

const sub = new Subject<String>();
export function send() {
  sub.next('Play');
}
const ob = sub.asObservable();

export function musicState() {
  if (audio.paused) audio.play();
  else audio.pause();
  return audio;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: `<h1 mat-dialog-title>Hi Human....</h1>
    <div mat-dialog-content>
      <p>Do You Want Play My Fav RDJ Jam..</p>
    </div>
    <div mat-dialog-actions>
      <button mat-raised-button (click)="yes()">Go on</button><br />
      <br /><button mat-raised-button (click)="no()">
        No Thanks!
      </button>
    </div>`,
})
export class DialogOverviewExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>) {}

  no(): void {
    this.dialogRef.close();
  }

  yes(): void {
    send();
    audio.play();
    this.no();
  }
}
