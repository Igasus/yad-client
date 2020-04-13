import { Component } from '@angular/core';
import { SliderService } from '../../_services/slider.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  sequence
} from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('sliderToggle', [
      state('close', style({
        opacity: 0,
        display: 'none'
      })),
      state('open', style({
        display: 'block',
        opacity: 1
      })),
      transition('close => open', sequence([
        style({ display: 'block' }),
        animate('0.3s')
      ])),
      transition('open => close', animate('0.3s'))
    ])
  ]
})
export class SliderComponent {
  isSliderOpened: boolean;
  images: Array<any>;
  currentSlideIndex: number;

  constructor(
    private sliderService: SliderService
  ) {
    this.isSliderOpened = false;
    this.images = [];
    this.currentSlideIndex = 0;

    sliderService.onSliderToggle.subscribe(data => this.onSliderToggle(data));
  }

  onSliderToggle(data: any) {
    if (data.index == -1)
      this.hideSlider();
    else {
      this.images = data.images;
      this.showSlider(data.index);
    }
    return;
  }


  showSlider(index: number) {
    this.currentSlideIndex = index;
    this.isSliderOpened = true;
    return;
  }

  hideSlider() {
    this.isSliderOpened = false;
    return;
  }

  close() {
    this.sliderService.close();
    return;
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.images.length;
    return;
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.images.length) % this.images.length;
    return;
  }

}
