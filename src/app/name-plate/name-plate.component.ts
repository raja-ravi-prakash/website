import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import {
  namePlateWidth,
  namePlateElementsFade,
} from './animations/name-plate-animation';

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
  constructor() {}

  ngOnInit(): void {}

  routeChange() {
    this.customStart = true;
    this.plateContentState = false;
  }

  elementsDone() {
    if (this.customStart) {
      this.plateState = false;
      this.customStart = false;
      this.customMiddle = true;
    } else if (this.customEnd) {
      this.customEnd = false;
    }
  }

  plateDone() {
    if (this.customMiddle) {
      this.contentChange();
      this.customMiddle = false;
      this.customEnd = true;
      this.plateState = true;
    } else if (this.customEnd) {
      this.plateContentState = true;
    }
  }

  options: AnimationOptions = {
    path: '/assets/meditate.json',
  };

  contentChange() {}
}
