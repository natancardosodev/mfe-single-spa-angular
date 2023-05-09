import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AlertService } from 'lib-vox-ui';

import { HttpOptions } from '@core/interfaces/sistema/http-options';
import { catchErrorApi, cleanParams, throwErrorAPI } from '@core/utils/generals.util';
import { TiposApisEnum } from '@core/enums/sistema/tipo-apis.enum';
import { UrlUtilService } from './url-util.service';

export abstract class BaseService {
    private _baseUrl: string;
    private _options: HttpOptions;
    private _optionsJarvis: HttpOptions;

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
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
        };
        this.optionsJarvis = {
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

    get optionsJarvis(): HttpOptions {
        return this._optionsJarvis;
    }

    set optionsJarvis(optionsJarvis: HttpOptions) {
        this._optionsJarvis = optionsJarvis;
    }

    get = (
        url: string,
        params?: any,
        tipoApi?: TiposApisEnum,
        isHideAlert?: boolean,
        customOptions?: HttpOptions
    ): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'get', params, null, tipoApi, customOptions).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => this.tratarErro(erro, isHideAlert, url))
        );
    };

    post = (
        url: string,
        body?: any,
        tipoApi?: TiposApisEnum,
        isHideAlert?: boolean,
        customOptions?: HttpOptions
    ): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'post', null, body, tipoApi, customOptions).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => this.tratarErro(erro, isHideAlert, url))
        );
    };

    put = (
        url: string,
        body?: any,
        tipoApi?: TiposApisEnum,
        isHideAlert?: boolean,
        customOptions?: HttpOptions
    ): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'get' /* 'put' */, null, body, tipoApi, customOptions).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => this.tratarErro(erro, isHideAlert, url))
        );
    };

    delete = (
        url: string,
        params?: Record<string, string> | any,
        tipoApi?: TiposApisEnum,
        isHideAlert?: boolean,
        customOptions?: HttpOptions
    ): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'delete', params, null, tipoApi, customOptions).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => this.tratarErro(erro, isHideAlert, url))
        );
    };

    uploadArquivo = (url: string, body?: any, tipoApi?: TiposApisEnum, isHideAlert?: boolean): Observable<any> => {
        const options: HttpOptions = {
            withCredentials: true,
            responseType: 'json',
            body: body
        };
        return this.http.request('post', this.getUrl(url, tipoApi), options).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => this.tratarErro(erro, isHideAlert, url))
        );
    };

    downloadArquivo = (url: string, body?: any, tipoApi?: TiposApisEnum, isHideAlert?: boolean): Observable<any> => {
        this.options = {
            withCredentials: true,
            responseType: 'blob',
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }),
            body: body
        };
        return this.http.request('get', this.getUrl(url, tipoApi), this.options).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) => {
                this.showMessageError(
                    erro.error.message ? erro.error.message : erro.message,
                    erro.status,
                    this.options.responseType
                );

                return isHideAlert ? throwErrorAPI(erro.error) : throwErrorAPI();
            })
        );
    };

    sendRequest = (
        url: string,
        type: string,
        params?: Record<string, any>,
        body?: any,
        tipoApi?: TiposApisEnum,
        customOptions?: HttpOptions
    ): Observable<any> => {
        this.options = customOptions
            ? customOptions
            : tipoApi === TiposApisEnum.JARVIS
            ? this.optionsJarvis
            : this.options;
        this.options['params'] = !params || typeof params === undefined ? null : cleanParams(params);
        this.options['body'] = body;
        this.options['observe'] = tipoApi === TiposApisEnum.JARVIS ? 'response' : 'body';

        return this.http.request(type, url, this.options);
    };

    public getUrl(url: string, tipoApi?: TiposApisEnum): string {
        const concatUrl = url ? `${this._baseUrl}${url}` : this._baseUrl;

        return this.urlUtilService.montarUrlApi(concatUrl, null, tipoApi);
    }

    public showMessageError(msg: Record<string, any> | Array<any> | any, status?: number, responseType?: string): void {
        let msgErr = null;
        const msgDefault = 'Ocorreu um erro na requisição';

        if (!msgErr && JSON.stringify(msg).toString().includes('ds_retorno')) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const arrayMessageSiarco = JSON.parse(msg).erros.map((err: Record<string, string>) => {
                return { message: `<strong> Erro: ${err['ds_retorno']} ${err['ds_valor']} </strong>` };
            });
            msgErr = { messagesMultiple: arrayMessageSiarco };
        }

        if (!msgErr && JSON.stringify(msg).toString().includes('[{')) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            const arrayMessageVox = msg.error.map((err: Record<string, string>) => {
                return { message: `<strong> Erro ${err['code']}: ${err['message']} </strong>` };
            });
            msgErr = { message: arrayMessageVox[0].message };
        }

        if (!msgErr && JSON.stringify(msg).toString().includes('{}')) {
            msgErr = { message: '<strong> Erro: Requisição ou arquivo não encontrado.</strong>' };
        }

        if (responseType === 'blob' && status === 404) {
            msgErr = { message: 'Arquivo não encontrado' };
        }

        if (!msgErr && JSON.stringify(msg).toString().includes('message')) {
            msgErr = { message: `<strong> Erro: ${msg.message} </strong>` };
        }

        if (!msgErr) {
            msgErr = { message: msgDefault };
        }

        const args = Object.assign(
            {
                title: 'Atenção',
                style: 'danger',
                isToast: false
            },
            msgErr
        );

        void this.alertService.openModal(args);
    }

    private tratarErro(erro: HttpErrorResponse, isHideAlert: boolean, url: string): Observable<never> {
        if (isHideAlert) {
            return throwErrorAPI(erro.error);
        }

        this.showMessageError(catchErrorApi(erro, isHideAlert));

        return throwErrorAPI(null, url);
    }
}
