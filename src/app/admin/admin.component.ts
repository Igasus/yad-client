import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServerService } from '../_services/server.service';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loginForm: FormGroup;
  passwordForm: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private serverService: ServerService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.passwordForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }



  login() {
    if (this.loginForm.invalid) {
      this.alertService.addAlert("Incorrect username or password!", "error");
      return;
    }

    this.loading = true;

    let username = this.loginForm.controls.username.value;
    let password = this.loginForm.controls.password.value;
    let result = this.serverService.login(username, password);

    if (result)
      this.alertService.addAlert("Success!", "info");
    else
      this.alertService.addAlert("Incorrect username or password!", "error");
  }



  register() {
  }
}
