import { Directive, Output, Input, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]'
})
export class DragAndDropDirective {

  @Output() onFilesDropped = new EventEmitter<any>();
  @Output() onDragOver = new EventEmitter<any>();
  @Output() onDragLeave = new EventEmitter<any>();

  //Dragover listener
  @HostListener('dragover', ['$event']) dragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onDragOver.emit();
  }

  //Dragleave listener
  @HostListener('dragleave', ['$event']) public dragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.onDragLeave.emit();
  }

  //Drop listener
  @HostListener('drop', ['$event']) public filesDrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFilesDropped.emit(files)
    }
  }

}
