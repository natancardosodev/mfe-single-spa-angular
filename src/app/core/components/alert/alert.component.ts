import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

import { MessagesMultipleInterface } from '@core/interfaces/args-options.interface';
import { AlertService } from './alert.service';

@Component({
    selector: 'lib-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit, OnDestroy {
    @ViewChild('alert') private content: ElementRef;
    public show: boolean;
    public title: string;
    public body: string | HTMLElement;
    public messagesMultiple: Array<MessagesMultipleInterface>;
    public style: string;
    public size: string;
    public callBack: () => void;
    public isBtnClose: boolean;
    private subscription: Subscription;

    public get modalRef(): BsModalRef {
        return this._bsModalRef;
    }

    public set modalRef(modal: BsModalRef) {
        this._bsModalRef = modal;
    }

    constructor(
        private modalService: BsModalService,
        private _bsModalRef: BsModalRef,
        private alertService: AlertService
    ) {
        this.show = false;
    }

    public ngOnInit(): void {
        this.subscription = this.alertService.loaderState.subscribe((state) => {
            if (state.show) {
                this.title = state.title;
                this.body = state.message;
                this.style = state.style || 'warning';
                this.messagesMultiple = state.messagesMultiple;
                this.callBack = state.callBack;
                this.size = state.size;
                this.isBtnClose = typeof state?.isBtnClose === 'undefined' || state.isBtnClose;
                const config: Record<string, any> = {
                    class: this.size ? `br-modal is-${this.size}` : 'br-modal is-medium',
                    backdrop: state.backdrop || true
                };
                this.modalRef = this.modalService.show(this.content, config);
            } else {
                this.close();
            }
        });
    }

    public ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    public close(): void {
        if (typeof this.callBack !== 'undefined') this.callBack();
        this.modalRef.hide();
    }
}
