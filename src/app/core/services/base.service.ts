/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { AlertService } from 'lib-ui-interno';

import { UrlUtilService } from './url-util.service';
import { HttpOptions } from '../interfaces/http-options';

export abstract class BaseService {
    private _baseUrl: string;
    private _options: HttpOptions;
    private _optionsBasic: HttpOptions;

    constructor(
        baseUrl: string = null,
        protected http: HttpClient,
        protected urlUtilService: UrlUtilService,
        protected alertService: AlertService
    ) {
        this.baseUrl = baseUrl;
        this.options = {
            withCredentials: true,
            responseType: 'json',
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
        };
        this.optionsBasic = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    }

    get baseUrl(): string {
        return this._baseUrl;
    }

    set baseUrl(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    get options(): HttpOptions {
        return this._options;
    }

    set options(options: HttpOptions) {
        this._options = options;
    }

    get optionsBasic(): HttpOptions {
        return this._optionsBasic;
    }

    set optionsBasic(optionsBasic: HttpOptions) {
        this._optionsBasic = optionsBasic;
    }

    get = (url?: string, params?: any, tipoApi?: string, isRequestComplete?: boolean): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'get', params, null, isRequestComplete).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => {
                this.alertService.openModal(erro.error.message);
                return this.tratarErro(erro);
            })
        );
    };

    post = (url?: string, body?: any, tipoApi?: string, isRequestComplete?: boolean): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'post', null, body, isRequestComplete).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => {
                this.alertService.openModal(erro.error.message);
                return this.tratarErro(erro);
            })
        );
    };

    /**
     * @description Toda requisição put requisitará o infoLog, regra decidida para a implementação de log no gateway que consome o siarco.
     * @memberof BaseService
     */
    put = (url?: string, body?: any, tipoApi?: string, isRequestComplete?: boolean): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'put', null, body, isRequestComplete).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => {
                this.alertService.openModal(erro.error.message);
                return this.tratarErro(erro);
            })
        );
    };

    delete = (
        url?: string,
        params?: Record<string, string> | any,
        tipoApi?: string,
        isRequestComplete?: boolean
    ): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'delete', params, null, isRequestComplete).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => {
                this.alertService.openModal(erro.error.message);
                return this.tratarErro(erro);
            })
        );
    };

    uploadArquivo = (url?: string, body?: any, tipoApi?: string): Observable<any> => {
        return this.http
            .post(this.getUrl(url, tipoApi), body, {
                withCredentials: true,
                observe: 'events',
                reportProgress: true
            })
            .pipe(
                take(1),
                catchError((erro: HttpErrorResponse) => {
                    this.alertService.openModal(erro.error.message);
                    return this.tratarErro(erro);
                })
            );
    };

    downloadArquivo = (type?: string, url?: string, body?: any, tipoApi?: string): Observable<any> => {
        this.options = {
            withCredentials: true,
            responseType: 'blob',
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }),
            body: body
        };
        return this.http.request(type, this.getUrl(url, tipoApi), this.options).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => {
                this.alertService.openModal(erro.error.message);
                return this.tratarErro(erro);
            })
        );
    };

    sendRequest = (
        url: string,
        type: string,
        params?: Record<string, string>,
        body?: any,
        isRequestComplete?: boolean
    ): Observable<any> => {
        this.options = isRequestComplete ? this.optionsBasic : this.options;
        this.options['params'] = params ? this.cleanParams(params) : this.options['params'];
        this.options['body'] = body;
        this.options['observe'] = isRequestComplete ? 'response' : 'body';

        return this.http.request(type, url, this.options);
    };

    register = (url?: string, body?: any): Observable<any> => {
        return this.sendRequest(this.getUrl(url), 'post', null, body).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => {
                this.alertService.openModal(erro.error.message);
                return this.tratarErro(erro);
            })
        );
    };

    public getUrl(url: string, tipoApi?: string): string {
        const concatUrl = url ? `${this._baseUrl}${url}` : this._baseUrl;

        return this.urlUtilService.montarUrlApi(concatUrl, null, tipoApi);
    }

    public tratarErro(erro: HttpErrorResponse): Observable<never> {
        let erroMessage = 'Ocorreu um erro na requisição';

        try {
            erroMessage = String(erro.message);
        } catch (e) {
            erroMessage = 'Ocorreu um erro inesperado';
        }

        return throwError(new Error(erroMessage));
    }

    public showMessageError(msg: any, style = 'danger'): void {
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

    private cleanParams(params: any): any {
        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key] && typeof params[key] === 'object') this.cleanParams(params[key]);
                else if (params[key] === undefined) delete params[key];
            });
        }

        return params;
    }
}
