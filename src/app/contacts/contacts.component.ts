import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../_services/language.service';
import { ContentService } from '../_services/content.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  currentLanguage: string;
  contentAll: Array<any>;
  contentCurrent: any;

  constructor(
    private languageService: LanguageService,
    private contentService: ContentService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
    this.contentAll = this.contentService.getContent("Contacts");
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
