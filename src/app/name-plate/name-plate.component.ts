import { Component, OnInit, HostListener } from '@angular/core';
import {
  namePlateWidth,
  namePlateElementsFade,
} from './animations/name-plate-animation';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { CallServiceService } from '../services/call-service.service';

@Component({
  selector: 'app-name-plate',
  templateUrl: './name-plate.component.html',
  styleUrls: ['./name-plate.component.scss'],
  animations: [namePlateWidth, namePlateElementsFade],
})
export class NamePlateComponent implements OnInit {
  plateState: boolean = true;
  plateContentState: boolean = true;
  customStart: boolean = false;
  customMiddle: boolean = false;
  customEnd: boolean = false;
  switch = 'home';
  switchTemp;
  mobile = false;
  options = {
    con: ['home', 'builds', 'reachme', 'api', 'about'],
    home: {
      path: '/assets/meditate.json',
      state: false,
      quote: '" At Last one way or another \ntime made us cross our paths "',
    },
    builds: {
      path: '/assets/builds.json',
      state: false,
      quote:
        '" The computer was born to solve \n problems that did not exist before "',
    },
    reachme: {
      path: '/assets/reachme.json',
      state: false,
      quote:
        '“ A dream you dream alone is only a dream\n A dream you dream together is reality  ”',
    },
    api: {
      path: '/assets/api.json',
      state: false,
      quote:
        '" Engineers believe that if it ain’t broke,\n it doesn’t have enough features yet "',
    },
    about: {
      path: '/assets/about.json',
      state: false,
      quote: '" Don\'t try to fix existing stuff,\n just create a new one "',
    },
  };
  switchMap = this.options.home;

  constructor(public router: Router, public call: CallServiceService) {
    this.switchTemp = this.switch;
    this.changeState();
    this.view();
    this.listenCall();
    this.listenRoute();
  }

  listenRoute() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        if (val.url == '/') {
          /** handle this thing */
        } else {
          let url = val.url.split('/')[1];
          let current = this.options[url];
          if (!current.state) this.call.send(url);
        }
      }
    });
  }

  view() {
    if (window.innerWidth < 600) this.mobile = true;
    else this.mobile = false;
  }

  listenCall() {
    this.call.event.subscribe((val) => {
      this.switchTemp = val.toString().toLowerCase().split(/\s/).join('');
      this.changeState();
      this.routeChange();
    });
  }

  ngOnInit(): void {}

  changeState() {
    for (let key in this.options) {
      if (key == this.switchTemp) this.options[key].state = true;
      else this.options[key].state = false;
    }
  }

  closePlate() {
    this.plateState = false;
  }

  plateOpen() {
    this.plateState = true;
  }

  fadeContent() {
    this.plateContentState = false;
  }

  revealContent() {
    this.plateContentState = true;
  }

  routeChange() {
    this.customStart = true;
    this.fadeContent();
  }

  elementsDone() {
    if (this.customStart) {
      this.contentChange();
      this.revealContent();
      this.customStart = false;
    }
  }

  contentChange() {
    this.switch = this.switchTemp;
    this.switchMap = this.options[this.switch];
  }

  plateAnimationDone() {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 600) this.mobile = true;
    else this.mobile = false;
  }
}
