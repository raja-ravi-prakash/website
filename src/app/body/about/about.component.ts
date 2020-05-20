import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  constructor() {}

  best: any = [{ name: '', url: '' }];
  know: any = [{ name: '', url: '' }];
  techGood: any = [{ name: '', url: '' }];
  techKnow: any = [{ name: '', url: '' }];

  materialUrl =
    'https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/';

  ngOnInit(): void {
    this.best = ['Java Script', 'Type Script', 'Java', 'Console', 'C', 'Cpp'];
    this.know = ['Rust', 'Python', 'Dart', 'GraphQL'];
    this.techGood = ['Firebase', 'Angular', 'NodeJS', 'Flutter', 'Electron'];
    this.techKnow = ['Deno', 'Android', 'webpack','react'];
    this.best = this.setValues(this.best);
    this.know = this.setValues(this.know);
    this.techGood = this.setValues(this.techGood);
    this.techKnow = this.setValues(this.techKnow);
  }

  setValues(data: any) {
    for (let i = 0; i < data.length; i++) {
      let temp = {};
      temp['name'] = data[i];
      temp['url'] =
        this.materialUrl + data[i].split(' ').join('').toLowerCase() + '.svg';
      this.set(temp);
      data[i] = temp;
    }
    return data;
  }

  set(data) {
    switch (data.name) {
      case 'Flutter':
        data.url =
          'https://cdn.iconscout.com/icon/free/png-256/flutter-2038877-1720090.png';
        break;
      case 'Electron':
        data.url =
          'https://cdn.iconscout.com/icon/free/png-256/electron-67-1175035.png';
        break;
      case 'Deno':
        data.url =
          'https://upload.wikimedia.org/wikipedia/commons/8/84/Deno.svg';

      default:
        break;
    }
  }
}
