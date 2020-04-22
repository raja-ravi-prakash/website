import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isTop = true;
  items: Array<String> = ['Home', 'Builds', 'Reach Me', 'About'];
  constructor() {}

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    var top = document.getElementsByTagName('html')[0].scrollTop;
    top == 0 ? (this.isTop = true) : (this.isTop = false);
  }

  options: AnimationOptions = {
    path: '/assets/logo.json',
  };

  ngOnInit(): void {}
}
