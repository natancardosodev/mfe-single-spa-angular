/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { UrlUtilService } from './url-util.service';
import { HttpOptions } from '../interfaces/http-options';
import { AlertService } from 'src/app/core/services/alert.service';

export abstract class BaseService {
    private _baseUrl: string;
    private _options: HttpOptions;
    private _msgDefault: string;

    constructor(
        baseUrl: string = null,
        protected http: HttpClient,
        protected urlUtilService: UrlUtilService,
        private alertService: AlertService
    ) {
        this.baseUrl = baseUrl;
        this.options = {
            withCredentials: true,
            responseType: 'json',
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
        };
        this._msgDefault = 'Por favor tente novamente.';
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

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    get = (
        url?: string,
        params?: any,
        tipoApi?: string,
        isRequestComplete?: boolean,
        semModal?: boolean
    ): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'get', params, null, isRequestComplete).pipe(
            take(1),
            catchError((erro: HttpErrorResponse) =>
                semModal
                    ? null
                    : void this.alertService.openModal(erro.error ? erro.error.message : erro, this._msgDefault)
            )
        );
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    post = (url?: string, body?: any, tipoApi?: string, isRequestComplete?: boolean): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'post', null, body, isRequestComplete).pipe(
            take(1),
            catchError(
                (erro: HttpErrorResponse) =>
                    void this.alertService.openModal(erro.error ? erro.error.message : erro, this._msgDefault)
            )
        );
    };

    /**
     * @description Toda requisição put requisitará o infoLog, regra decidida para a implementação de log no gateway que consome o siarco.
     * @memberof BaseService
     */
    put = (url?: string, body?: any, tipoApi?: string, isRequestComplete?: boolean): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'put', null, body, isRequestComplete).pipe(
            take(1),
            catchError(
                (erro: HttpErrorResponse) =>
                    void this.alertService.openModal(erro.error ? erro.error.message : erro, this._msgDefault)
            )
        );
    };

    delete = (
        url?: string,
        params?: Record<string, string>,
        tipoApi?: string,
        isRequestComplete?: boolean
    ): Observable<any> => {
        return this.sendRequest(this.getUrl(url, tipoApi), 'delete', params, null, isRequestComplete).pipe(
            take(1),
            catchError(
                (erro: HttpErrorResponse) =>
                    void this.alertService.openModal(erro.error ? erro.error.message : erro, this._msgDefault)
            )
        );
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    uploadArquivo = (url?: string, body?: any, tipoApi?: string): Observable<any> => {
        return this.http.post(this.getUrl(url, tipoApi), body, {
            withCredentials: true,
            observe: 'events',
            reportProgress: true
        });
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    downloadArquivo = (type?: string, url?: string, body?: any, tipoApi?: string): Observable<any> => {
        this.options = {
            withCredentials: true,
            responseType: 'blob',
            headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }),
            body: body
        };
        return this.http.request(type, this.getUrl(url, tipoApi), this.options);
    };

    sendRequest = (
        url: string,
        type: string,
        params?: Record<string, string>,
        body?: any,
        isRequestComplete?: boolean
    ): Observable<any> => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.options['params'] = params ? this.cleanParams(params) : this.options['params'];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.options['body'] = body;
        this.options['observe'] = isRequestComplete ? 'response' : 'body';

        return this.http.request(type, url, this.options);
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    register = (url?: string, body?: any): Observable<any> => {
        return this.sendRequest(this.getUrl(url), 'post', null, body).pipe(
            take(1),
            catchError(
                (erro: HttpErrorResponse) =>
                    void this.alertService.openModal(erro.error.message, this._msgDefault, 'danger')
            )
        );
    };

    public getUrl(url: string, tipoApi?: string): string {
        const concatUrl = url ? `${this._baseUrl}${url}` : this._baseUrl;

        return this.urlUtilService.montarUrlApi(concatUrl, null, tipoApi);
    }

    private cleanParams(params: any): any {
        if (params) {
            Object.keys(params).forEach((key) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                if (params[key] && typeof params[key] === 'object') this.cleanParams(params[key]);
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                else if (params[key] === undefined) delete params[key];
            });
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return params;
    }
}
