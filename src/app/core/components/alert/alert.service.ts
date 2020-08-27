import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private _loaderSubject: Subject<any>;
    public loaderState: any;

    constructor() {
        this._loaderSubject = new Subject();
        this.loaderState = this._loaderSubject.asObservable();
    }

    /**
     * @param {string} [title] title that will be displayed at the top of the
     * @param {(string | HTMLElement)} [message] message that will be displayed inside the modal, can be passed `string` or `HTML`
     * @param {string} [alert] type of alert || success || danger || warning || info
     * @param {Function} [fun] function that will be called after the modal is closed
     * @param {string} [size] size of modal || sm || lg
     * @memberof AlertService
     */
    public openModal(title?: string, message?: string | HTMLElement, style?: string, size?: string): void {
        this._loaderSubject.next({
            show: true,
            title: title,
            body: message,
            style: style,
            size: size
        });
    }
}
