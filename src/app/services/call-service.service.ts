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
    this.call.next(data);
  }
}
