import { Injectable, Output, EventEmitter } from '@angular/core';


export interface Alert {
  message: string;
  type: string;
  id: number;
}


@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alerts: Array<Alert> = [];
  disappearDelay: number = 3000;

  constructor() { }

  @Output() alertsChanged: EventEmitter<Array<Alert>> = new EventEmitter();

  addAlert(message: string, type: string) {
    let id = 0;
    if (this.alerts.length > 0)
      id = this.alerts[this.alerts.length-1].id + 1;
    let alert: Alert = {
      message: message,
      type: type,
      id: id
    };
    this.alerts.push(alert);
    this.alertsChanged.emit(this.alerts);
    setTimeout(() => {
      this.deleteAlert(id);
    }, this.disappearDelay);
  }

  deleteAlert(id) {
    for (let i=0; i<this.alerts.length; i++) {
      if (this.alerts[i].id == id)
        this.alerts.splice(i, 1);
    }
    this.alertsChanged.emit(this.alerts);
  }
}
