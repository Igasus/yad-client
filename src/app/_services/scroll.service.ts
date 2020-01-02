import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  scrollOffset = 0;

  constructor() { }

  @Output() scrollOffsetChanged: EventEmitter<number> = new EventEmitter();

  changeScrollOffset(offset) {
    this.scrollOffset = offset;
    this.scrollOffsetChanged.emit(this.scrollOffset);
  }

}
