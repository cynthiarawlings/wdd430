import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindRefService {
  // nativeWindow: any;

  constructor() { }

  getNativeWindow() {
    return window;
  }

}
