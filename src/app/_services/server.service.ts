import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  projectsLinks: Array<string> = [];
  config: any = {};

  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) {
    this.configService
      .getConfig()
      .subscribe((data: any) => {
        this.config = data;
      });
  }

  getProjectsLinksFromServer() {
    let data = [
      "https://images.squarespace-cdn.com/content/v1/57fa538f414fb528b4122d54/1533588718646-Q7X1VPNFWAZXG8CIRB6T/ke17ZwdGBToddI8pDm48kH90xQx_mkJ5qKKo2IUgpn4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2ARkg7TIwY3CWcyqcZv3-vIiwHDPPSOjcNDglu5y_DVVbTvJybZOtvbWRiFosmN10/291.jpg",
      "http://energy.rajasthan.gov.in/content/dam/raj/energy/common/energy-power.jpg",
      "https://c.pxhere.com/images/84/83/f91897b14333f9143d252cd693cd-1594309.jpg!s",
      "https://assets.bosch.com/media/global/home/CO2-neutrality-earth-home.jpg",
      "https://smehota.club/wp-content/uploads/2019/09/Kartinki_jpg_1_20122126.jpg",
      "https://i.kym-cdn.com/photos/images/original/001/468/202/b02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Junonia_lemonias_DSF_upper_by_Kadavoor.JPG",
      "https://isthmus.com/downloads/56806/download/Feature-Off-The-Beaten-Path-crCarolynFathAshby-CityGuide2019.jpg?cb=ffcd1fbaf710b8d86d8de6b24da8b171",
      "https://www.indiantradeportal.in/uploads/sliderimg/slideImage1.jpg",
      "https://images.squarespace-cdn.com/content/v1/57fa538f414fb528b4122d54/1533588718646-Q7X1VPNFWAZXG8CIRB6T/ke17ZwdGBToddI8pDm48kH90xQx_mkJ5qKKo2IUgpn4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2ARkg7TIwY3CWcyqcZv3-vIiwHDPPSOjcNDglu5y_DVVbTvJybZOtvbWRiFosmN10/291.jpg",
      "http://energy.rajasthan.gov.in/content/dam/raj/energy/common/energy-power.jpg",
      "https://c.pxhere.com/images/84/83/f91897b14333f9143d252cd693cd-1594309.jpg!s",
      "https://assets.bosch.com/media/global/home/CO2-neutrality-earth-home.jpg",
      "https://smehota.club/wp-content/uploads/2019/09/Kartinki_jpg_1_20122126.jpg",
      "https://i.kym-cdn.com/photos/images/original/001/468/202/b02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Junonia_lemonias_DSF_upper_by_Kadavoor.JPG",
      "https://isthmus.com/downloads/56806/download/Feature-Off-The-Beaten-Path-crCarolynFathAshby-CityGuide2019.jpg?cb=ffcd1fbaf710b8d86d8de6b24da8b171",
      "https://www.indiantradeportal.in/uploads/sliderimg/slideImage1.jpg",
      "https://images.squarespace-cdn.com/content/v1/57fa538f414fb528b4122d54/1533588718646-Q7X1VPNFWAZXG8CIRB6T/ke17ZwdGBToddI8pDm48kH90xQx_mkJ5qKKo2IUgpn4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2ARkg7TIwY3CWcyqcZv3-vIiwHDPPSOjcNDglu5y_DVVbTvJybZOtvbWRiFosmN10/291.jpg",
      "http://energy.rajasthan.gov.in/content/dam/raj/energy/common/energy-power.jpg",
      "https://c.pxhere.com/images/84/83/f91897b14333f9143d252cd693cd-1594309.jpg!s",
      "https://assets.bosch.com/media/global/home/CO2-neutrality-earth-home.jpg",
      "https://smehota.club/wp-content/uploads/2019/09/Kartinki_jpg_1_20122126.jpg",
      "https://i.kym-cdn.com/photos/images/original/001/468/202/b02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Junonia_lemonias_DSF_upper_by_Kadavoor.JPG",
      "https://isthmus.com/downloads/56806/download/Feature-Off-The-Beaten-Path-crCarolynFathAshby-CityGuide2019.jpg?cb=ffcd1fbaf710b8d86d8de6b24da8b171",
      "https://www.indiantradeportal.in/uploads/sliderimg/slideImage1.jpg",
      "https://images.squarespace-cdn.com/content/v1/57fa538f414fb528b4122d54/1533588718646-Q7X1VPNFWAZXG8CIRB6T/ke17ZwdGBToddI8pDm48kH90xQx_mkJ5qKKo2IUgpn4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2ARkg7TIwY3CWcyqcZv3-vIiwHDPPSOjcNDglu5y_DVVbTvJybZOtvbWRiFosmN10/291.jpg",
      "http://energy.rajasthan.gov.in/content/dam/raj/energy/common/energy-power.jpg",
      "https://c.pxhere.com/images/84/83/f91897b14333f9143d252cd693cd-1594309.jpg!s",
      "https://assets.bosch.com/media/global/home/CO2-neutrality-earth-home.jpg",
      "https://smehota.club/wp-content/uploads/2019/09/Kartinki_jpg_1_20122126.jpg",
      "https://i.kym-cdn.com/photos/images/original/001/468/202/b02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Junonia_lemonias_DSF_upper_by_Kadavoor.JPG",
      "https://isthmus.com/downloads/56806/download/Feature-Off-The-Beaten-Path-crCarolynFathAshby-CityGuide2019.jpg?cb=ffcd1fbaf710b8d86d8de6b24da8b171",
      "https://www.indiantradeportal.in/uploads/sliderimg/slideImage1.jpg",
      "https://images.squarespace-cdn.com/content/v1/57fa538f414fb528b4122d54/1533588718646-Q7X1VPNFWAZXG8CIRB6T/ke17ZwdGBToddI8pDm48kH90xQx_mkJ5qKKo2IUgpn4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2ARkg7TIwY3CWcyqcZv3-vIiwHDPPSOjcNDglu5y_DVVbTvJybZOtvbWRiFosmN10/291.jpg",
      "http://energy.rajasthan.gov.in/content/dam/raj/energy/common/energy-power.jpg",
      "https://c.pxhere.com/images/84/83/f91897b14333f9143d252cd693cd-1594309.jpg!s",
      "https://assets.bosch.com/media/global/home/CO2-neutrality-earth-home.jpg",
      "https://smehota.club/wp-content/uploads/2019/09/Kartinki_jpg_1_20122126.jpg",
      "https://i.kym-cdn.com/photos/images/original/001/468/202/b02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Junonia_lemonias_DSF_upper_by_Kadavoor.JPG",
      "https://isthmus.com/downloads/56806/download/Feature-Off-The-Beaten-Path-crCarolynFathAshby-CityGuide2019.jpg?cb=ffcd1fbaf710b8d86d8de6b24da8b171",
      "https://www.indiantradeportal.in/uploads/sliderimg/slideImage1.jpg",
      "https://images.squarespace-cdn.com/content/v1/57fa538f414fb528b4122d54/1533588718646-Q7X1VPNFWAZXG8CIRB6T/ke17ZwdGBToddI8pDm48kH90xQx_mkJ5qKKo2IUgpn4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2ARkg7TIwY3CWcyqcZv3-vIiwHDPPSOjcNDglu5y_DVVbTvJybZOtvbWRiFosmN10/291.jpg",
      "http://energy.rajasthan.gov.in/content/dam/raj/energy/common/energy-power.jpg",
      "https://c.pxhere.com/images/84/83/f91897b14333f9143d252cd693cd-1594309.jpg!s",
      "https://assets.bosch.com/media/global/home/CO2-neutrality-earth-home.jpg",
      "https://smehota.club/wp-content/uploads/2019/09/Kartinki_jpg_1_20122126.jpg",
      "https://i.kym-cdn.com/photos/images/original/001/468/202/b02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Junonia_lemonias_DSF_upper_by_Kadavoor.JPG",
      "https://isthmus.com/downloads/56806/download/Feature-Off-The-Beaten-Path-crCarolynFathAshby-CityGuide2019.jpg?cb=ffcd1fbaf710b8d86d8de6b24da8b171",
      "https://www.indiantradeportal.in/uploads/sliderimg/slideImage1.jpg",
      "https://images.squarespace-cdn.com/content/v1/57fa538f414fb528b4122d54/1533588718646-Q7X1VPNFWAZXG8CIRB6T/ke17ZwdGBToddI8pDm48kH90xQx_mkJ5qKKo2IUgpn4UqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z2ARkg7TIwY3CWcyqcZv3-vIiwHDPPSOjcNDglu5y_DVVbTvJybZOtvbWRiFosmN10/291.jpg",
      "http://energy.rajasthan.gov.in/content/dam/raj/energy/common/energy-power.jpg",
      "https://c.pxhere.com/images/84/83/f91897b14333f9143d252cd693cd-1594309.jpg!s",
      "https://assets.bosch.com/media/global/home/CO2-neutrality-earth-home.jpg",
      "https://smehota.club/wp-content/uploads/2019/09/Kartinki_jpg_1_20122126.jpg",
      "https://i.kym-cdn.com/photos/images/original/001/468/202/b02.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Junonia_lemonias_DSF_upper_by_Kadavoor.JPG",
      "https://isthmus.com/downloads/56806/download/Feature-Off-The-Beaten-Path-crCarolynFathAshby-CityGuide2019.jpg?cb=ffcd1fbaf710b8d86d8de6b24da8b171",
      "https://www.indiantradeportal.in/uploads/sliderimg/slideImage1.jpg",
    ];
    return data;
  }



  getProjectsLinks() {
    if (this.projectsLinks.length == 0)
      this.projectsLinks = this.getProjectsLinksFromServer();
    return this.projectsLinks;
  }



  login(username: string, password: string) {
    let account: any = {
      login: username,
      password: password
    };
    let responce: boolean = false;
    this.http
      .post(this.config.serverUrl + "admin/login", account)
      .subscribe((data: any) => {
        responce = data.result;
      });
    if (responce)
      this.getAccountInfoBySession();
    return responce;
  }



  register(login: string, password: string) {
    let account: any = {
      login: login,
      password: password
    };
    let responce: boolean = false;
    this.http
      .post(this.config.serverUrl + "admin/register", account)
      .subscribe((data: any) => {
        responce = data.result;
      });
    console.log(responce + "\n" + this.config.serverUrl);
    return responce;
  }



  getAccountInfoBySession() {

  }



  getAccountInfoByLogin(login: string) {

  }



  getAllAccountsInfo() {

  }
}
