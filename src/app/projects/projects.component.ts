import { Component, AfterContentInit, ViewChild } from '@angular/core';
import { ServerService } from '../_services/server.service';
import { ScrollService } from '../_services/scroll.service';
import { SliderService } from '../_services/slider.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterContentInit {


  loadedLinks: Array<string> = []; // Array of ONLY loaded links
  links: Array<string>; //Array of all links
  lastLoadedLinkIndex: number; //Index of last loaded link in 'links' array
  updateLayout: boolean = false; //Boolean variable that lets to update layout after loading a new image
  generateInProcess: boolean; //Boolean variable that shows is the gallery adding new images at the moment
  scrollOffset: number = 0; //Page scroll offset
  extraOffset: number = 500; /*Necessary distance in pixels from bottom of the window to the lowest level of the gallery
                                 to add new image */

  constructor(
    private serverService: ServerService,
    private scrollService: ScrollService,
    private sliderService: SliderService
  ) {
    this.scrollService.onScroll.subscribe(offset => this.onScroll(offset));
  }


  //setting standart options
  ngAfterContentInit() {
    this.links = this.serverService.getProjectsLinks();
    this.generateInProcess = true;
    this.loadedLinks.push(this.links[0]);
    this.lastLoadedLinkIndex = 0;
  }


  //Function that checks if we can add new image to gallery
  checkImageAddingOpportunity() {
    //Index out of range
    if (this.lastLoadedLinkIndex >= this.links.length - 1)
      return false;

    //Images mustn't be added out of window
    let galleryHeight = document.getElementById("gallery").clientHeight;
    let windowHeight = window.innerHeight;
    if (this.scrollOffset + windowHeight + this.extraOffset > galleryHeight)
      return true;

    return false;
  }


  //On page scrolling
  onScroll(offset: number) {
    this.scrollOffset = offset;

    //Check if the gallery is already generating
    if (this.generateInProcess == true)
      return;

    if (this.checkImageAddingOpportunity())
      this.loadNewImage();
    else
      this.generateInProcess = false;
  }


  //On image load
  onLoad() {
    if (this.checkImageAddingOpportunity())
      this.loadNewImage();
    else
      this.generateInProcess = false;
  }

  //Adding a new gallery image
  loadNewImage() {
    this.generateInProcess = true;
    this.lastLoadedLinkIndex++;
    this.loadedLinks.push(this.links[this.lastLoadedLinkIndex]);
    this.updateLayout = !this.updateLayout; //Updating layout
  }

  //Showing full-page slider
  showSlider(id) {
    this.sliderService.open(this.loadedLinks, id);
  }

}
