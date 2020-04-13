import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../_services/language.service';
import { ContentService } from '../../_services/content.service';
import { ServerService } from '../../_services/server.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  sequence
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('languageToggle', [
      state('active', style({
        borderBottom: '2px solid black',
        color: 'black'
      })),
      state('inactive', style({
        borderBottom: 'none',
        color: '#817474'
      }))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  currentLanguage: string;
  contentAll: Object;
  contentCurrent: Array<string>;
  isLoggedIn: boolean;
  username: string;


  constructor(
    private languageService: LanguageService,
    private contentService: ContentService,
    private serverService: ServerService
  ) {
    this.currentLanguage = this.languageService.getLanguage();
    this.contentAll = this.contentService.getContent("Header");
    this.contentCurrent = this.contentAll[this.currentLanguage];
    this.isLoggedIn = this.serverService.getUserState();
    this.username = "";

    this.languageService.languageChanged
      .subscribe(language => this.changeHeaderLanguage(language));

    this.serverService.userStateChanged
      .subscribe(state => this.changeHeaderUserState(state));
  }


  ngOnInit() {
    this.changeLanguage(this.languageService.getLanguage());
  }


  changeHeaderUserState(newState) {
    this.isLoggedIn = newState;
    if (newState)
      this.username = this.serverService.getUserInfo().username;
    else
      this.username = "";
  }

  changeLanguage(newLanguage: string) {
    return this.languageService.changeLanguage(newLanguage);
  }

  changeHeaderLanguage(newLanguage: string) {
    this.currentLanguage = newLanguage;
    this.contentCurrent = this.contentAll[newLanguage];
    return true;
  }

}
