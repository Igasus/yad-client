import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  configUrl: string = 'assets/config.json';

  constructor(
    private http: HttpClient
  ) {
    this.configUrl = 'assets/config.json';
  }

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
