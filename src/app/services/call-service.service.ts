import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CallServiceService {
  public call: Subject<Object> = new Subject<Object>();
  public event: Observable<Object> = this.call.asObservable();
  constructor() {}

  public send(data: any) {
    document.getElementById('plate').scrollIntoView();
    this.call.next(data);
  }

  public fly(data: any) {
    console.log(data);
    this.call.next('builds');
    setTimeout(function () {
      document.getElementById(data).scrollIntoView();
    }, 1000);
  }
}
