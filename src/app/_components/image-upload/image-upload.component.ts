import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SliderService } from "../../_services/slider.service";
import { ScrollService } from "../../_services/scroll.service";
import { ServerService } from "../../_services/server.service";
import { AlertService } from "../../_services/alert.service";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


interface Image {
  url: any;
  file: any;
  uploadComplete: boolean;
}


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  animations: [
    trigger('ShowHideTrigger', [
      state('hide', style({
        opacity: 0
      })),
      state('show', style({
        opacity: 1
      })),
      transition('show <=> hide', animate('0.3s'))
    ])
  ]
})
export class ImageUploadComponent implements OnInit {
  uploadForm: FormGroup;
  toLoadQueue: Array<any>;
  images: Array<Image>;
  loading: boolean;
  dragAndDropFaded: boolean;

  updateMasonryLayout: boolean;
  masonryUpdateOffset: number;
  lastMasonryUpdateOffset: number;
  masonryOptions: any;

  constructor(
    private formBuilder: FormBuilder,
    private sliderService: SliderService,
    private scrollService: ScrollService,
    private serverService: ServerService,
    private alertService: AlertService
  ) {
    this.toLoadQueue = [];
    this.images = [];
    this.loading = false;
    this.dragAndDropFaded = true;

    this.masonryUpdateOffset = 200;
    this.updateMasonryLayout = true;
    this.lastMasonryUpdateOffset = 0;
    this.masonryOptions = {
      itemSelector: '.preload-gallery-item'
    };

    this.scrollService.onScroll.subscribe(offset => this.onScroll(offset));
  }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      files: [null, Validators.required]
    });
  }

  onScroll(offset: number) {
    if (Math.abs(offset - this.lastMasonryUpdateOffset) < this.masonryUpdateOffset)
      return;
    this.lastMasonryUpdateOffset = offset;
    this.updateMasonryLayout = !this.updateMasonryLayout;
    return;
  }


  //Uploading all images
  async uploadAllImages() {
    for (let image of this.images) {
      let result = await this.uploadImage(image);

      if (result)
        console.log("\nSuccess!\nFile:\n");
      else
        console.log("\nFault!\nFile:\n");
      console.log(image.file);
    }

    this.alertService.addAlert("Files was successfully added!", "success");

    return;
  }

  //Uploading certain image
  async uploadImage(image) {
    const file = image.file;
    const formData = new FormData();
    formData.append('file', file);

    return await this.serverService.uploadImage(formData);
  }


  onImageInputChange(files) {
    this.dragAndDropFaded = true;
    for (let file of files)
      this.toLoadQueue.push(file);
    this.loadNext();
    return;
  }


  loadNext() {
    if (this.toLoadQueue.length == 0)
      return;

    let file = this.toLoadQueue[0];
    this.toLoadQueue.splice(0, 1);

    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      let img: Image = {
        url: fileReader.result,
        file: file,
        uploadComplete: false
      };
      this.images.push(img);
    }
    return;
  }


  onDragOver() {
    this.dragAndDropFaded = false;
    return;
  }

  onDragLeave() {
    this.dragAndDropFaded = true;
    return;
  }


  zoomImage(id: number) {
    let imagesUrls = [];
    for (let image of this.images)
      imagesUrls.push(image.url);
    this.sliderService.open(imagesUrls, id);
    return;
  }

  unzoomImage() {
    this.sliderService.close();
    return;
  }

  removeImage(id: number) {
    if (id < 0 || id >= this.images.length)
      return false;

    let resultImages = [];
    for (let i = 0; i < this.images.length; i++)
      if (i != id)
        resultImages.push(this.images[i]);
    this.images = resultImages;

    return true;
  }

  clearPreloadGallery() {
    this.images = [];
    return;
  }

}
