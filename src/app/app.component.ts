import { Component, HostListener } from '@angular/core';
import { ScrollService } from './_services/scroll.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private scrollService: ScrollService,
  ) {

  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.scrollService.changeScrollOffset(window.scrollY);
  }

}
