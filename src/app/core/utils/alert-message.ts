import { AlertService } from 'lib-alert';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AlertMessage {
    constructor(private alertService: AlertService) {}

    public alert(message: string, style = 'warning', title = 'Atenção'): void {
        this.alertService.openModal({
            message: `<strong>${message}</strong>`,
            title: `${title}`,
            alert: style
        });
    }
}
