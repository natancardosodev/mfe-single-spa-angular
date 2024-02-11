import { Injectable } from '@angular/core';
import { ArgsOptions } from '@core/interfaces/args-options.interface';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    public loaderState: Observable<ArgsOptions>;
    public loaderSubject: Subject<ArgsOptions>;

    constructor() {
        this.loaderSubject = new Subject();
        this.loaderState = this.loaderSubject.asObservable();
    }

    /**
     * @param {(string | HTMLElement)} [message] message that will be displayed inside the modal, can be passed `string` or `HTML`
     * @param {string} [title] title that will be displayed at the top of the
     * @param {string} [style] type of style || success || danger || warning || info
     * @param {Function} [callBack] function that will be called after the modal is closed
     * @param {Array<{ message: string }>} messagesMultiple Multiples messages
     * @param {string} [size] size of modal || sm || lg
     * @memberof AlertService
     */
    public openModal(args: ArgsOptions): void {
        const { message, title, style, messagesMultiple, callBack, size, backdrop, isBtnClose } = args;
        this.loaderSubject.next({
            show: true,
            title: title,
            message: message,
            messagesMultiple: messagesMultiple,
            style: style,
            callBack: callBack,
            size: size,
            backdrop: backdrop,
            isBtnClose: isBtnClose
        });
    }

    public closeModal(): void {
        this.loaderSubject.next({ show: false });
    }
}
