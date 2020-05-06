import { Component, OnInit, HostListener } from '@angular/core';
import {
  namePlateWidth,
  namePlateElementsFade,
} from './animations/name-plate-animation';
import { Router } from '@angular/router';
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
      quote:
        '" Sometimes it is the people no one can imagine anything of who do the things no one can imagine "',
    },
  };
  switchMap = this.options.home;

  constructor(public router: Router, private call: CallServiceService) {
    if (window.innerWidth < 600) this.mobile = true;
    else this.mobile = false;
    call.event.subscribe((val) => {
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

  routeChange() {
    this.customStart = true;
    this.plateContentState = false;
  }

  elementsDone() {
    if (this.customStart) {
      this.plateState = false;
      this.contentChange();
      this.customStart = false;
      this.customMiddle = true;
    } else if (this.customEnd) {
      this.customEnd = false;
    }
  }

  plateDone() {
    if (this.customMiddle) {
      this.customMiddle = false;
      this.customEnd = true;
      this.plateState = true;
    } else if (this.customEnd) {
      this.plateContentState = true;
    }
  }

  contentChange() {
    this.switch = this.switchTemp;
    this.switchMap = this.options[this.switchTemp];
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log(this.mobile);
    if (window.innerWidth < 600) this.mobile = true;
    else this.mobile = false;
  }
}
