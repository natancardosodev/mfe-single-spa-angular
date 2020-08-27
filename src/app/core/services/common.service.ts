/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, forkJoin, BehaviorSubject, Subscription } from 'rxjs';

import { Storage } from '../enums/storage.enum';
import { StorageUtil } from '../utils/storage.util';
import { HttpUtil } from '../utils/http-util';
import { AlertService } from '../components/alert/alert.service';
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
    public motivoBaixaOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public classificacaoCrcOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public tipoClassificacaoCrcOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public escolaridadeOptions: BehaviorSubject<any> = new BehaviorSubject([]);

    /**
     *Creates an instance of CommonService.
     * @param {HttpClient} http
     * @param {UrlUtilService} urlUtilService
     * @memberof CommonService
     */
    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('', http, urlUtilService, alertService);
    }

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsTipoDocumento = (): Observable<any> => this.get('/tipo-documento');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsLogradouro = (): Observable<any> => this.get('/logradouro');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsTipoImovel = (): Observable<any> => this.get('/tipo-imovel');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsEstado = (): Observable<any> => this.get('/uf');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsMotivoBaixa = (): Observable<any> => this.get('/motivo-baixa');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsClassificacaoCrc = (): Observable<any> => this.get('/classificacao-crc');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsTipoClassificacaoCrc = (): Observable<any> => this.get('/tipo-classificacao-crc');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsEscolaridade = (): Observable<any> => this.get('/escolaridade');

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
                this.getOptionsMotivoBaixa(),
                this.getOptionsClassificacaoCrc(),
                this.getOptionsTipoClassificacaoCrc(),
                this.getOptionsEscolaridade()
            ]).subscribe(
                ([
                    tipoDocumentoOptions,
                    logradouroOptions,
                    tipoImovelOptions,
                    estadoOptions,
                    motivoBaixaOptions,
                    classificacaoCrcOptions,
                    tipoClassificacaoCrcOptions,
                    escolaridadeOptions
                ]) => {
                    this.tipoDocumentoOptions.next(tipoDocumentoOptions);
                    this.logradouroOptions.next(logradouroOptions);
                    this.tipoImovelOptions.next(tipoImovelOptions);
                    this.estadoOptions.next(estadoOptions);
                    this.motivoBaixaOptions.next(motivoBaixaOptions);
                    this.classificacaoCrcOptions.next(classificacaoCrcOptions);
                    this.tipoClassificacaoCrcOptions.next(tipoClassificacaoCrcOptions);
                    this.escolaridadeOptions.next(escolaridadeOptions);

                    this.saveCommonOptionsInStorage({
                        tipoDocumentoOptions,
                        logradouroOptions,
                        tipoImovelOptions,
                        estadoOptions,
                        motivoBaixaOptions,
                        classificacaoCrcOptions,
                        tipoClassificacaoCrcOptions,
                        escolaridadeOptions
                    });
                },
                (error) => HttpUtil.tratarErro(error)
            );
        }

        this.loadAllOptionsFromLocalStorage();
    };

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

    public getAllOptionsFromLocalStorage(): Record<string, string> {
        return this.hasCommonOptionsInStorage ? StorageUtil.get(Storage.COMMON_SERVICE_OPTIONS) : null;
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
            motivoBaixaOptions,
            classificacaoCrcOptions,
            tipoClassificacaoCrcOptions,
            escolaridadeOptions
        } = StorageUtil.get(Storage.COMMON_SERVICE_OPTIONS);

        this.logradouroOptions.next(logradouroOptions);
        this.tipoDocumentoOptions.next(tipoDocumentoOptions);
        this.tipoImovelOptions.next(tipoImovelOptions);
        this.estadoOptions.next(estadoOptions);
        this.motivoBaixaOptions.next(motivoBaixaOptions);
        this.classificacaoCrcOptions.next(classificacaoCrcOptions);
        this.tipoClassificacaoCrcOptions.next(tipoClassificacaoCrcOptions);
        this.escolaridadeOptions.next(escolaridadeOptions);
    }

    public getValueByKey(optionName: string, key: string): string {
        const options = this.resolve(optionName, this);
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
}