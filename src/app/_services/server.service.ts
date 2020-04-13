import { Injectable, Output, EventEmitter } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  projectsLinks: any;
  serverUrl: string;
  httpOptions: any;
  nullUser: any;
  loggedIn;
  user: any;

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) {
    this.projectsLinks = new Array();
    this.httpOptions = { withCredentials: true };
  }


  @Output() userStateChanged: EventEmitter<boolean> = new EventEmitter();


  getUserState() {
    return this.loggedIn;
  }

  getUserInfo() {
    return this.user;
  }



  async setConfig() {
    let configPromise = new Promise((resolve, reject) => {
      this.configService.getConfig()
        .subscribe((config: any) => {
          resolve(config);
        });
    });

    let config: any = await configPromise;

    this.serverUrl = config.serverUrl;
    this.httpOptions = config.httpOptions;
    this.nullUser = config.nullUser;

    return true;
  }



  async loadStartData() {
    this.projectsLinks = await this.getProjectsLinksFromServer();
    this.updateUserData();
    return true;
  }




  async updateUserData() {
    this.loggedIn = await this.sign("check", "", "");
    if (this.loggedIn)
      this.user = await this.getAccountInfoBySession();
    else
      this.user = {
        username: null,
        password: null,
        post: null
      };
    this.userStateChanged.emit(this.loggedIn);

    return true;
  }




  async getProjectsLinksFromServer() {
    let request = new Promise((resolve, reject) => {
      this.http
        .get(this.serverUrl + "projects/getLinks", this.httpOptions)
        .subscribe((data: any) => {
          let result = [];
          for (let i = data.length - 1; i >= 0; i--)
            result.push(this.serverUrl + "projects/" + data[i]);

          resolve(result);
        });
    });

    let result = await request;

    return result;
  }




  getProjectsLinks() {
    return this.projectsLinks;
  }




  async sign(type: string, username: string, password: string) {
    let request = new Promise((resolve, reject) => {
      let account: any = {
        username: username,
        password: password
      };

      if (type == "in" || type == "up")
        this.http.post(this.serverUrl + "admin/sign/" + type, account, this.httpOptions)
        .subscribe((data: any) => {
          resolve(data);
        });

      if (type == "out" || type == "check")
        this.http
          .get(this.serverUrl + "admin/sign/" + type, this.httpOptions)
          .subscribe((data: any) => {
            if (data && type == "out")
              this.loggedIn = false;
            if (data && type == "check")
              this.loggedIn = true;
            resolve(data);
          });
    });

    let result = await request;

    return result;
  }




  async getAccountInfoBySession() {
    let responce = new Promise((resolve, reject) => {
      this.http.get(this.serverUrl + "admin/account", this.httpOptions)
      .subscribe((data) => {
        resolve(data);
      });
    });

    return await responce;
  }




  async getAccountInfoByUsername(username: string) {
    let responce = new Promise((resolve, reject) => {
      this.http.post(this.serverUrl + "admin/account", username, this.httpOptions)
      .subscribe(data => {
        resolve(data);
      });
    });

    return await responce;
  }




  async getAllAccountsInfo() {
    let data: any = await this.getAccountInfoByUsername("");
    return data.accounts;
  }


  async uploadImage(formData: FormData) {
    let responce = new Promise((resolve, reject) => {
      this.http.post<any>(this.serverUrl + "projects/add", formData, this.httpOptions)
      .subscribe(data => {
        resolve(data);
      });
    });

    return await responce;
  }


  removeImage() {

  }

}
