/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from 'lib-ui-interno';
import { UrlUtilService } from '../services/url-util.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private urlUtilService: UrlUtilService, private alertService: AlertService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                () => {},
                (error: HttpErrorResponse) => {
                    if (error && (error.status === 401 || error.status === 302)) {
                        this.urlUtilService.redirectToLogin();
                    }
                    if (error && (error.status === 400 || error.status === 500)) {
                        this.showMessageError(error.error.message);
                    }
                }
            )
        );
    }

    private showMessageError(msg: any, style = 'danger'): void {
        let msgErr = null;
        const msgDefault = 'Ocorreu um erro na requisição';
        const iconSuccess = '<i class="fa fa-check" aria-hidden="true"></i> ';
        const iconDanger = '<i class="fa fa-exclamation-triangle fa-3" aria-hidden="true"></i> ';
        const icon = style === 'success' ? iconSuccess : iconDanger;

        if (!msg) {
            msgErr = { message: msgDefault };
        }
        if (JSON.stringify(String(msg)).indexOf('ds_erro') != -1 && Object.keys(msg).length > 0) {
            const arrayMessageVox = JSON.parse(msg).map((err: Record<string, string>) => {
                return { message: `<strong> ${icon} Erro ${err.cod_erro}: ${err.ds_erro} </strong>` };
            });
            msgErr = { messagesMultiple: arrayMessageVox };
        }
        if (String(msg).indexOf('{') != -1 && Object.keys(JSON.parse(msg).erros).length > 0) {
            const arrayMessageSiarco = JSON.parse(msg).erros.map((err: Record<string, string>) => {
                return { message: `<strong> ${icon} Erro: ${err.ds_retorno} ${err.ds_valor} </strong>` };
            });
            msgErr = { messagesMultiple: arrayMessageSiarco };
        }
        if (!msgErr) {
            msgErr = { message: `<strong> ${icon} Erro: ${msg} </strong>` };
        }

        const args = Object.assign(
            {
                title: 'Atenção',
                style: style
            },
            msgErr
        );

        void this.alertService.openModal(args);
    }
}
