import { Component, OnInit } from '@angular/core';
import { ServerService } from '../_services/server.service';
import { ScrollService } from '../_services/scroll.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  sequence
} from '@angular/animations';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
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
export class ProjectsComponent implements OnInit {
  isSliderOpened: boolean = false;
  loadedLinks: Array<string> = [];
  links: Array<string> = [];
  currentSlideIndex: number = 0;
  scrollOffset: number = 0;
  lastLoadedLinkIndex: number = 0;



  constructor(
    private serverService: ServerService,
    private scrollService: ScrollService
  ) {
    this.scrollService.scrollOffsetChanged.subscribe(offset=>{
      this.scrollOffset = offset;
      this.loadNewImage();
    });
  }



  ngOnInit() {
    this.links = this.serverService.getProjectsLinks();
    this.loadedLinks.push(this.links[0]);
  }



  loadNewImage() {
    let linkIndex = this.lastLoadedLinkIndex + 1;
    if (linkIndex == this.links.length)
      return;
    let windowHeight = window.innerHeight;
    let galleryHeight = document.getElementById("gallery").clientHeight;
    if (windowHeight + this.scrollOffset >= galleryHeight - 300) {
      this.loadedLinks.push(this.links[linkIndex]);
      this.lastLoadedLinkIndex = linkIndex;
    }
  }



  showSlider(id) {
    this.currentSlideIndex = id;
    this.isSliderOpened = true;
  }

  hideSlider() { this.isSliderOpened = false; }



  nextSlide() { this.currentSlideIndex = (this.currentSlideIndex + 1) % this.links.length; }

  prevSlide() { this.currentSlideIndex = (this.currentSlideIndex - 1 + this.links.length) % this.links.length; }
}
