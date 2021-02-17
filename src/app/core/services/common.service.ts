import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, forkJoin, BehaviorSubject, Subscription, throwError } from 'rxjs';

import { Storage } from '../enums/storage.enum';
import { StorageUtil } from '../utils/storage.util';
import { BaseService } from './base.service';
import { UrlUtilService } from './url-util.service';

/**
 * @export
 * @class CommonService
 * @extends {BaseService}
 */
@Injectable({
    providedIn: 'root'
})
export class CommonService extends BaseService {
    public tipoDocumentoOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public logradouroOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public tipoImovelOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public estadoOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public municipioOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public classificacaoCrcOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public tipoClassificacaoCrcOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public escolaridadeOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    private tipoApi = 'jarvis';

    /**
     *Creates an instance of CommonService.
     * @param {HttpClient} http
     * @param {UrlUtilService} urlUtilService
     * @memberof CommonService
     */
    constructor(http: HttpClient, urlUtilService: UrlUtilService) {
        super('', http, urlUtilService);
    }

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsTipoDocumento = (): Observable<any> => this.get('/tipo-documento/combo', null, this.tipoApi, true);

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsLogradouro = (): Observable<any> =>
        this.get('/comum/tipo-logradouro/combo', null, this.tipoApi, true);

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsTipoImovel = (): Observable<any> => this.get('/tipo-imovel/combo', null, this.tipoApi, true);

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsEstado = (): Observable<any> => this.get('/uf', null, this.tipoApi, true);

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsClassificacaoCrc = (): Observable<any> =>
        this.get('/classificacao-crc/combo', null, this.tipoApi, true);

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsTipoClassificacaoCrc = (): Observable<any> =>
        this.get('/tipo-classificacao-crc/combo', null, this.tipoApi, true);

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsEscolaridade = (): Observable<any> => this.get('/escolaridade/combo', null, this.tipoApi, true);

    /**
     * @memberof CommonService
     */
    public getAllOptions = (): Subscription | void => {
        if (!this.hasCommonOptionsInStorage) {
            return forkJoin([
                this.getOptionsTipoDocumento(),
                this.getOptionsLogradouro(),
                this.getOptionsTipoImovel(),
                this.getOptionsEstado(),
                this.getOptionsClassificacaoCrc(),
                this.getOptionsTipoClassificacaoCrc(),
                this.getOptionsEscolaridade()
            ]).subscribe(
                ([
                    tipoDocumentoOptions,
                    logradouroOptions,
                    tipoImovelOptions,
                    estadoOptions,
                    classificacaoCrcOptions,
                    tipoClassificacaoCrcOptions,
                    escolaridadeOptions
                ]) => {
                    this.tipoDocumentoOptions.next(tipoDocumentoOptions.body);
                    this.logradouroOptions.next(logradouroOptions.body);
                    this.tipoImovelOptions.next(tipoImovelOptions.body);
                    this.estadoOptions.next(estadoOptions.body);
                    this.classificacaoCrcOptions.next(classificacaoCrcOptions.body);
                    this.tipoClassificacaoCrcOptions.next(tipoClassificacaoCrcOptions.body);
                    this.escolaridadeOptions.next(escolaridadeOptions.body);

                    this.saveCommonOptionsInStorage({
                        tipoDocumentoOptions,
                        logradouroOptions,
                        tipoImovelOptions,
                        estadoOptions,
                        classificacaoCrcOptions,
                        tipoClassificacaoCrcOptions,
                        escolaridadeOptions
                    });
                },
                (error: HttpErrorResponse) => throwError(new Error(error.error.message))
            );
        }

        this.loadAllOptionsFromLocalStorage();
    };

    public getAllOptionsFromLocalStorage(): Record<string, string> {
        return this.hasCommonOptionsInStorage ? StorageUtil.get(Storage.COMMON_SERVICE_OPTIONS) : null;
    }

    public getValueByKey(optionName: string, key: string): string {
        const options = this.resolve(optionName, this);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const value = options.filter((op) =>
            op && typeof op.key === 'string' ? op.key === key : parseInt(op.key) === parseInt(key)
        );
        return value.length ? value[0].value : '-';
    }

    public resolve(path: string, obj: CommonService) {
        return path.split('.').reduce(function (prev, curr) {
            return prev ? prev[curr] : null;
        }, obj || self);
    }

    /**
     * @readonly
     * @private
     * @type {boolean}
     * @memberof CommonService
     */
    private get hasCommonOptionsInStorage(): boolean {
        return sessionStorage.getItem(Storage.COMMON_SERVICE_OPTIONS) !== null;
    }

    /**
     * @private
     * @param {*} anyOptions
     * @memberof CommonService
     */
    private saveCommonOptionsInStorage(anyOptions: any): void {
        StorageUtil.store(Storage.COMMON_SERVICE_OPTIONS, { ...anyOptions, ...this.getAllOptionsFromLocalStorage() });
    }

    /**
     * @private
     * @memberof CommonService
     */
    private loadAllOptionsFromLocalStorage(): void {
        const {
            logradouroOptions,
            tipoDocumentoOptions,
            tipoImovelOptions,
            estadoOptions,
            classificacaoCrcOptions,
            tipoClassificacaoCrcOptions,
            escolaridadeOptions
        } = StorageUtil.get(Storage.COMMON_SERVICE_OPTIONS);

        this.logradouroOptions.next(logradouroOptions.body);
        this.tipoDocumentoOptions.next(tipoDocumentoOptions.body);
        this.tipoImovelOptions.next(tipoImovelOptions.body);
        this.estadoOptions.next(estadoOptions.body);
        this.classificacaoCrcOptions.next(classificacaoCrcOptions.body);
        this.tipoClassificacaoCrcOptions.next(tipoClassificacaoCrcOptions.body);
        this.escolaridadeOptions.next(escolaridadeOptions.body);
    }
}
