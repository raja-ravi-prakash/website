import { Component, OnInit } from '@angular/core';
import {
  namePlateWidth,
  namePlateElementsFade,
} from './animations/name-plate-animation';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
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
  options = {
    con: ['home', 'builds', 'reachme', 'api', 'about'],
    home: {
      path: '/assets/meditate.json',
      state: false,
    },
    builds: {
      path: '/assets/builds.json',
      state: false,
    },
    reachme: {
      path: '/assets/reachme.json',
      state: false,
    },
    api: {
      path: '/assets/api.json',
      state: false,
    },
    about: {
      path: '/assets/about.json',
      state: false,
    },
  };

  constructor(public router: Router, private call: CallServiceService) {
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
  }
}
