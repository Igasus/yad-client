import { Component, OnInit } from '@angular/core';
import { ContentService } from '../_services/content.service';
import { LanguageService } from '../_services/language.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  currentLanguage: string;
  contentAll: Array<any>;
  contentCurrent: any;

  constructor(
    private contentService: ContentService,
    private languageService: LanguageService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
    this.contentAll = this.contentService.getContent("About");
    this.contentCurrent = this.contentAll[this.currentLanguage];

    this.languageService.languageChanged
      .subscribe(newLanguage => this.changeLanguage(newLanguage));
  }

  ngOnInit() {
  }

  changeLanguage(newLanguage) {
    this.contentCurrent = this.contentAll[newLanguage];
    return true;
  }

}
