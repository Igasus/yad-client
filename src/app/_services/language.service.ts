import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  languages: Array<string>;
  currentLanguage: string;

  constructor() {
    this.languages = [ "english", "russian" ];
    this.currentLanguage = this.languages[0];
  }

  @Output() languageChanged: EventEmitter<string> = new EventEmitter();

  isLanguageExist(language: string) {
    for (let i = 0; i < this.languages.length; i++) {
      if (language == this.languages[i])
        return true;
    }
    return false;
  }

  setLanguage() {
    let language = localStorage.getItem("language");
    if(!language || !this.isLanguageExist(language))
      language = "english";
    return this.changeLanguage(language);
  }

  changeLanguage(newLanguage: string) {
    if (!this.isLanguageExist(newLanguage))
      return false;
    localStorage.setItem("language", newLanguage);
    this.currentLanguage = newLanguage;
    this.languageChanged.emit(newLanguage);
    console.log("Language changed: " + newLanguage);
    return true;
  }

  getLanguage() {
    return this.currentLanguage;
  }

}
