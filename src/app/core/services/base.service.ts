/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { UrlUtilService } from './url-util.service';
import { HttpOptions } from '../interfaces/http-options';
import { AlertService } from '../components/alert/alert.service';

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
    get = (url?: string, params?: any, isSigfacil?: boolean): Observable<any> => {
        return this.sendRequest(this.getUrl(url, isSigfacil), 'get', params).pipe(
            take(1),
            catchError(
                (erro: HttpErrorResponse) =>
                    void this.alertService.openModal(erro.error.message, this._msgDefault, 'danger')
            )
        );
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    post = (url?: string, body?: any, isSigfacil?: boolean): Observable<any> => {
        return this.sendRequest(this.getUrl(url, isSigfacil), 'post', null, body).pipe(
            take(1),
            catchError(
                (erro: HttpErrorResponse) =>
                    void this.alertService.openModal(erro.error.message, this._msgDefault, 'danger')
            )
        );
    };

    /**
     * @description Toda requisição put requisitará o infoLog, regra decidida para a implementação de log no gateway que consome o siarco.
     * @memberof BaseService
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    put = (url?: string, body?: any, isSigfacil?: boolean): Observable<any> => {
        return this.sendRequest(this.getUrl(url, isSigfacil), 'put', null, body).pipe(
            take(1),
            catchError(
                (erro: HttpErrorResponse) =>
                    void this.alertService.openModal(erro.error.message, this._msgDefault, 'danger')
            )
        );
    };

    delete = (url?: string, params?: Record<string, string>, isSigfacil?: boolean): Observable<any> => {
        return this.sendRequest(this.getUrl(url, isSigfacil), 'delete', params).pipe(
            take(1),
            catchError(
                (erro: HttpErrorResponse) =>
                    void this.alertService.openModal(erro.error.message, this._msgDefault, 'danger')
            )
        );
    };

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    sendRequest = (url: string, type: string, params?: Record<string, string>, body?: any): Observable<any> => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.options['params'] = params ? this.cleanParams(params) : this.options['params'];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        this.options['body'] = body;

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

    public getUrl(url: string, isSigfacil?: boolean): string {
        const concatUrl = url ? `${this._baseUrl}${url}` : this._baseUrl;

        return this.urlUtilService.montarUrlApi(concatUrl, null, isSigfacil);
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
