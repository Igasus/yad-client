import { Component, OnInit } from '@angular/core';
import { Alert, AlertService } from '../../_services/alert.service';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  alerts: Array<Alert> = [];

  constructor(
    private alertService: AlertService
  ) {
    this.alertService
      .alertsChanged
      .subscribe((data: Array<Alert>) => {
        this.alerts = data;
      });
  }

  ngOnInit() { }

  hideAlert(id) {
    this.alertService.deleteAlert(id);
  }
}
