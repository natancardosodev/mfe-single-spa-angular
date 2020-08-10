/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

import { Observable, forkJoin, BehaviorSubject, Subscription } from 'rxjs';
import { AlertService } from 'lib-alert';

import { UrlUtilService } from './url-util.service';
import { StorageUtil } from '../utils/storage.util';
import { HttpUtil } from '../utils/http-util';

/**
 * @export
 * @class CommonService
 * @extends {BaseService}
 */
@Injectable({
    providedIn: 'root'
})
export class CommonService extends BaseService {
    public nacionalidadeOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public estadoOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public estadoCivilOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public tipoLogradouroOptions: BehaviorSubject<any> = new BehaviorSubject([]);

    private commonOptionsStorageName = 'commonOptions';

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
    public getOptionsNacionalidade = (): Observable<any> => this.get('/pessoa/nacionalidade');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsEstado = (): Observable<any> => this.get('/endereco/uf');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsEstadoCivil = (): Observable<any> => this.get('/pessoa/estado-civil');

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsTipoLogradouro = (): Observable<any> => this.get('/endereco/tipo-logradouro');

    /**
     * @memberof CommonService
     */
    public getAllOptions = (): Subscription | void => {
        if (!this.hasCommonOptionsInStorage) {
            return forkJoin([
                this.getOptionsNacionalidade(),
                this.getOptionsEstado(),
                this.getOptionsEstadoCivil(),
                this.getOptionsTipoLogradouro()
            ]).subscribe(
                ([nacionalidadeOptions, estadoOptions, estadoCivilOptions, tipoLogradouroOptions]) => {
                    this.nacionalidadeOptions.next(nacionalidadeOptions);
                    this.estadoOptions.next(estadoOptions);
                    this.estadoCivilOptions.next(estadoCivilOptions);
                    this.tipoLogradouroOptions.next(tipoLogradouroOptions);

                    this.saveCommonOptionsInStorage({
                        nacionalidadeOptions,
                        estadoOptions,
                        estadoCivilOptions,
                        tipoLogradouroOptions
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
        return sessionStorage.getItem(this.commonOptionsStorageName) !== null;
    }

    /**
     * @private
     * @param {*} anyOptions
     * @memberof CommonService
     */
    private saveCommonOptionsInStorage(anyOptions: any): void {
        StorageUtil.store(this.commonOptionsStorageName, { ...anyOptions, ...this.getAllOptionsFromLocalStorage() });
    }

    public getAllOptionsFromLocalStorage(): Record<string, string> {
        return this.hasCommonOptionsInStorage ? StorageUtil.get(this.commonOptionsStorageName) : null;
    }

    /**
     * @private
     * @memberof CommonService
     */
    private loadAllOptionsFromLocalStorage(): void {
        const { estadoOptions, nacionalidadeOptions, estadoCivilOptions, tipoLogradouroOptions } = StorageUtil.get(
            this.commonOptionsStorageName
        );

        this.estadoOptions.next(estadoOptions);
        this.nacionalidadeOptions.next(nacionalidadeOptions);
        this.estadoCivilOptions.next(estadoCivilOptions), this.tipoLogradouroOptions.next(tipoLogradouroOptions);
    }

    public getValueByKey(optionName: string, key: string): string {
        const options = this.resolve(optionName, this);
        const value = options.filter((op) =>
            op && typeof op.key === 'string' ? op.key === key : parseInt(op.key) === parseInt(key)
        );
        return value.length ? value[0].value : '-';
    }

    public resolve(path: string, obj: CommonService): any {
        return path.split('.').reduce(function (prev, curr) {
            return prev ? prev[curr] : null;
        }, obj || self);
    }
}
