import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  images: Array<any>;
  currentImageIndex: number;

  @Output() onSliderToggle = new EventEmitter<any>();

  constructor() {
    this.images = [];
    this.currentImageIndex = -1;
  }

  open(newImages: Array<any>, id: number) {
    this.images = newImages;
    this.currentImageIndex = id;
    this.onSliderToggle.emit({
      images: this.images,
      index: this.currentImageIndex
    });
    return;
  }

  close() {
    this.currentImageIndex = -1;
    this.onSliderToggle.emit({
      images: [],
      index: this.currentImageIndex
    });
    return;
  }
}
