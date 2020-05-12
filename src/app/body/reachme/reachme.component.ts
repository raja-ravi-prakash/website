import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MatFormFieldModule,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { FormControl, Validators } from '@angular/forms';
import { zip } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reachme',
  templateUrl: './reachme.component.html',
  styleUrls: ['./reachme.component.scss'],
})
export class ReachmeComponent {
  constructor(
    public http: HttpClient,
    public snackbar: MatSnackBar,
    public cookie: CookieService
  ) {
    const combo = zip(
      this.name.valueChanges,
      this.email.valueChanges,
      this.msg.valueChanges
    );

    combo.subscribe((val: Array<String>) => {
      if (val.join('').length == 0) {
        this.dis = true;
      } else this.dis = false;
    });
  }

  dis = true;
  isMessaged: boolean;
  social = [
    {
      path: '/assets/fb.gif',
      name: 'facebook',
    },
    {
      path: '/assets/git.gif',
      name: 'Github',
    },
    {
      path: '/assets/insta.gif',
      name: 'Instagram',
    },
  ];

  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required]);
  msg = new FormControl('', [Validators.required]);

  checkMessage() {
    this.http;
  }

  getEmailError() {
    if (this.email.hasError('required')) {
      return 'This is required';
    } else if (this.email.hasError('email')) {
      return 'Not a valid email';
    }

    return '';
  }
  getNameError() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }
  getMsgError() {
    if (this.msg.hasError('required')) {
      return 'You must enter a value';
    }
    return '';
  }

  go() {
    let data = {
      email: this.email.value,
      name: this.name.value,
      message: this.msg.value,
    };

    this.http
      .post('https://us-central1-ronin-admin.cloudfunctions.net/reachme', data)
      .subscribe((val) => {
        if (val) {
          this.snackbar.open('Message Send.', 'Ok', {
            duration: 3000,
            direction: 'ltr',
          });
        } else {
          this.snackbar.open('You Already Placed a Message.', 'Ok', {
            duration: 3000,
            direction: 'ltr',
          });
        }
      });
  }
}
