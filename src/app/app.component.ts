import { Component, HostListener } from '@angular/core';
import { ScrollService } from './_services/scroll.service';
import { ServerService } from './_services/server.service';
import { LanguageService } from './_services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startDataLoaded: boolean;

  constructor(
    private scrollService: ScrollService,
    private serverService: ServerService,
    private languageService: LanguageService
  ) {
    this.startDataLoaded = false;
    this.start();
  }

  async start() {
    this.languageService.setLanguage();
    let configSet = await this.serverService.setConfig();
    console.log("Config set: " + configSet);
    this.startDataLoaded = await this.serverService.loadStartData();
    console.log("Start data loaded: " + this.startDataLoaded);
    return true;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.scrollService.changeScrollOffset(window.scrollY);
  }

}
