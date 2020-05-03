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
import { CallServiceService } from '../services/call-service.service';

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
  items: Array<String> = ['Home', 'Builds', 'API', 'Reach Me', 'About'];
  plateStart: Function = function () {};
  plateEnd: Function = function () {};

  constructor(public route: Router, public call: CallServiceService) {}

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
    this.call.send(item);
    this.menu();
  }
  menuToogle(item: String) {
    this.route.navigate([item.toLocaleLowerCase().split(/\s/).join('')]);
    this.call.send(item);
  }

  ngOnInit(): void {}
}
