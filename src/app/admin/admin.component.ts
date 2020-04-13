import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../_services/server.service';
import { AlertService } from '../_services/alert.service';
import { ConfigService } from '../_services/config.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  sequence
} from '@angular/animations';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [
    trigger('ShowHideTrigger', [
      state('close', style({
        opacity: 0,
        display: 'none'
      })),
      state('open', style({
        display: 'block',
        opacity: 1
      })),
      transition('close => open', sequence([
        style({ display: 'block' }),
        animate('0.3s')
      ])),
      transition('open => close', animate('0.3s'))
    ])
  ]
})
export class AdminComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  uploadForm: FormGroup;
  isRegisterFormOpen: boolean;
  isUploadFormOpen: boolean;
  loading: boolean;
  loggedIn: boolean;
  nullUser: any;
  user: any;
  preloadImages: Array<any>;
  uploadImages: Array<any>;

  constructor(
    private formBuilder: FormBuilder,
    private serverService: ServerService,
    private alertService: AlertService,
    private configService: ConfigService
  ) {
    this.isRegisterFormOpen = false;
    this.isUploadFormOpen = false;
    this.loading = false;
    this.loggedIn = this.serverService.getUserState();
    this.preloadImages = new Array();
    this.uploadImages = new Array();

    this.configService.getConfig()
      .subscribe((config: any) => {
        this.nullUser = config.nullUser;
      });

    this.serverService.userStateChanged.subscribe(async (data) => {
      if (data) {
        this.loggedIn = true;
        this.user = await this.serverService.getAccountInfoBySession();
      }
      else {
        this.loggedIn = false;
        this.user = this.nullUser;
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.uploadForm = this.formBuilder.group({
      files: [null, Validators.required]
    });
  }



  async sign(type) {
    let username: string = "";
    let password: string = "";

    this.loading = true;

    if (type == "in") {
      if (this.loginForm.invalid) {
        this.alertService.addAlert("Username or password can not be empty!", "error");
        return;
      }
      username = this.loginForm.controls.username.value;
      password = this.loginForm.controls.password.value;
    }

    if (type == "up") {
      if (this.registerForm.invalid) {
        this.alertService.addAlert("Username or password can not be empty!", "error");
        return;
      }
      username = this.registerForm.controls.username.value;
      password = this.registerForm.controls.password.value;
    }

    let result = await this.serverService.sign(type, username, password);

    console.log("Sign " + type + " from result: " + result);
    this.loading = false;

    if (result) {
      this.alertService.addAlert("Success!", "success");
      if (type == "in" || type == "out")
        this.serverService.updateUserData();
    }
    else {
      if (type == "in")
        this.alertService.addAlert("Incorrect username or password!", "error");
      if (type == "up")
        this.alertService.addAlert("Account with this login is already exist!", "error");
    }

    return;
  }



  showRegisterForm() {
    this.isRegisterFormOpen = true;
  }

  hideRegisterForm() {
    this.isRegisterFormOpen = false;
  }



  showUploadForm() {
    this.isUploadFormOpen = true;
  }

  hideUploadForm() {
    this.isUploadFormOpen = false;
  }



  onImageInputChange(event) {
    let files = event.target.files;
    if (files.length == 0)
      return;

    for (let file of files) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = (_event) => {
        this.preloadImages.push(fileReader.result);
        this.uploadImages.push(file);
      }
    }
  }

  uploadImage() {
    return;
  }

}
