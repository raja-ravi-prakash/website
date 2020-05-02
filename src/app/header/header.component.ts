import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { NamePlateComponent } from '../name-plate/name-plate.component';

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
export class HeaderComponent implements OnInit {
  isTop = true;
  ismenu = false;
  items: Array<String> = ['Home', 'Builds', 'Reach Me', 'About'];
  plateStart: Function = function () {};
  plateEnd: Function = function () {};

  constructor(public route: Router) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    var top = document.getElementsByTagName('html')[0].scrollTop;
    top == 0 ? (this.isTop = true) : (this.isTop = false);
  }

  options: AnimationOptions = {
    path: '/assets/logo.json',
  };

  menu() {
    this.ismenu = !this.ismenu;
  }

  menuAction(item: String) {
    this.route.navigate([item.toLocaleLowerCase().split(/\s/).join('')]);
    console.log(item);
    this.menu();
  }
  menuToogle(item: String) {
    this.route.navigate([item.toLocaleLowerCase().split(/\s/).join('')]);
    console.log(item);
  }

  ngOnInit(): void {}
}
