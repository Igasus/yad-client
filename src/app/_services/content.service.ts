import { Injectable } from '@angular/core';
import { Content } from '../../assets/content'

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  content: Array<any>;

  constructor() {
    this.content = this.setContent(Content);
  }

  setContent(data) {
    let result = new Array();
    for (let element of data)
      result[element.component] = this.setLanguages(element.content);
    return result;
  }

  setLanguages(data) {
    let result = new Array();
    for (let element of data)
      result[element.language] = element;
    return result;
  }

  getContent(componentName) {
    if (componentName)
      return this.content[componentName];
    return this.content;
  }
}
