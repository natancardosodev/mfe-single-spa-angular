import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AlertService } from 'lib-ui-interno';

import { CommonOptionsEnum } from '@core/enums/commonOptions.enum';
import { DadosInterface, OptionsCommonInterface } from '@core/interfaces/sistema/common.interface';
import { TiposApisEnum } from '@core/enums/tipo-apis.enum';

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
    public classificacaoCrcOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public tipoClassificacaoCrcOptions: BehaviorSubject<any> = new BehaviorSubject([]);
    public escolaridadeOptions: BehaviorSubject<any> = new BehaviorSubject([]);

    private commonOptionsStorageName = 'commonOptions';
    private tipoApi = TiposApisEnum.JARVIS;

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
    // Caso não seja necessário passar o jarvis, chamar o get como no exemplo abaixo:
    // Ex: public getOptionsCategoria = (): Observable<any> => this.get('/categoria-denuncia');
    public getOptionsTipoClassificacaoCrc = (): Observable<any> =>
        this.get('/tipo-classificacao-crc/combo', null, this.tipoApi, true);

    /**
     * @returns {Observable<any>}
     * @memberof CommonService
     */
    public getOptionsEscolaridade = (): Observable<any> => this.get('/escolaridade/combo', null, this.tipoApi, true);

    /**
     * Chamar esse método sempre que for necessário carregar as opções de selects dinâmico em qualquer funcionalidade
     * o mesmo assumira a  tarefa de intentificar se carregara os dados do storage, caso tenha, ou da api.
     * @returns {void}
     * @memberof CommonService
     */
    public getOptions(optionsName: Array<CommonOptionsEnum>): void {
        optionsName.forEach((optionName) => {
            if (!this.hasOptionInStorage(optionName)) {
                switch (optionName) {
                    case CommonOptionsEnum.TIPO_DOCUMENTO_OPTIONS:
                        this.getOptionsTipoDocumento()
                            .pipe(take(1))
                            //  Caso o response não tenha o .body outilizar o exemplo do .subscribe abaixo:
                            // .subscribe((response) => this.setValuesOption(response, optionName));
                            .subscribe((response: HttpResponse<any>) => {
                                this.setValuesOption(response.body as Array<DadosInterface>, optionName);
                            });
                        break;
                    case CommonOptionsEnum.LOGRADOURO_OPTIONS:
                        this.getOptionsLogradouro()
                            .pipe(take(1))
                            .subscribe((response: HttpResponse<any>) => {
                                this.setValuesOption(response.body as Array<DadosInterface>, optionName);
                            });
                        break;
                    case CommonOptionsEnum.TIPO_IMOVEL_OPTIONS:
                        this.getOptionsTipoImovel()
                            .pipe(take(1))
                            .subscribe((response: HttpResponse<any>) => {
                                this.setValuesOption(response.body as Array<DadosInterface>, optionName);
                            });
                        break;
                    case CommonOptionsEnum.ESTADO_OPTIONS:
                        this.getOptionsEstado()
                            .pipe(take(1))
                            .subscribe((response: HttpResponse<any>) => {
                                this.setValuesOption(response.body as Array<DadosInterface>, optionName);
                            });
                        break;
                    case CommonOptionsEnum.CLASSIFICACAO_CRC_OPTIONS:
                        this.getOptionsClassificacaoCrc()
                            .pipe(take(1))
                            .subscribe((response: HttpResponse<any>) => {
                                this.setValuesOption(response.body as Array<DadosInterface>, optionName);
                            });
                        break;
                    case CommonOptionsEnum.TIPO_CLASSIFICACAO_CRC_OPTIONS:
                        this.getOptionsTipoClassificacaoCrc()
                            .pipe(take(1))
                            .subscribe((response: HttpResponse<any>) => {
                                this.setValuesOption(response.body as Array<DadosInterface>, optionName);
                            });
                        break;
                    case CommonOptionsEnum.ESCOLARIDADE_OPTIONS:
                        this.getOptionsEscolaridade()
                            .pipe(take(1))
                            .subscribe((response: HttpResponse<any>) => {
                                this.setValuesOption(response.body as Array<DadosInterface>, optionName);
                            });
                        break;

                    default:
                        break;
                }
            }
        });

        this.loadAllOptionsFromLocalStorage();
    }

    /**
     * @returns {void}
     * @memberof CommonService
     */
    public setValuesOption(value: Array<DadosInterface>, optionName: string): void {
        const optionBehavior = this[optionName] as BehaviorSubject<any>;
        const commonOption = {};
        commonOption[optionName] = value;
        optionBehavior.next(value);
        this.saveCommonOptionsInStorage(commonOption);
    }

    // Essa solução é utilizada caso queira carregar todas as opções de uma única vez como era feito anteriormente
    public loadingAllOptions(): void {
        this.loadingOptionsEndereco();
        this.getOptions([
            CommonOptionsEnum.TIPO_DOCUMENTO_OPTIONS,
            CommonOptionsEnum.CLASSIFICACAO_CRC_OPTIONS,
            CommonOptionsEnum.TIPO_CLASSIFICACAO_CRC_OPTIONS,
            CommonOptionsEnum.ESCOLARIDADE_OPTIONS
        ]);
    }

    public loadingOptionsEndereco(): void {
        this.getOptions([
            CommonOptionsEnum.LOGRADOURO_OPTIONS,
            CommonOptionsEnum.TIPO_IMOVEL_OPTIONS,
            CommonOptionsEnum.ESTADO_OPTIONS
        ]);
    }

    /**
     * @public
     * @memberof CommonService
     */
    public loadAllOptionsFromLocalStorage(): void {
        if (StorageUtil.get(this.commonOptionsStorageName)) {
            const {
                tipoDocumentoOptions,
                logradouroOptions,
                tipoImovelOptions,
                estadoOptions,
                classificacaoCrcOptions,
                tipoClassificacaoCrcOptions,
                escolaridadeOptions
            } = StorageUtil.get(this.commonOptionsStorageName);

            this.tipoDocumentoOptions.next(tipoDocumentoOptions);
            this.logradouroOptions.next(logradouroOptions);
            this.tipoImovelOptions.next(tipoImovelOptions);
            this.estadoOptions.next(estadoOptions);
            this.classificacaoCrcOptions.next(classificacaoCrcOptions);
            this.tipoClassificacaoCrcOptions.next(tipoClassificacaoCrcOptions);
            this.escolaridadeOptions.next(escolaridadeOptions);
        }
    }

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
     * Verifica se o option passado tem no storage
     * @private
     * @param {CommonOptionsEnum} option
     * @memberof CommonService
     */
    private hasOptionInStorage(option: CommonOptionsEnum): boolean {
        const commonOptionsSalvos = StorageUtil.get(Storage.COMMON_SERVICE_OPTIONS) as OptionsCommonInterface;
        return commonOptionsSalvos ? !!commonOptionsSalvos[option] : false;
    }

    /**
     * @private
     * @param {*} anyOptions
     * @memberof CommonService
     */
    private saveCommonOptionsInStorage(anyOptions: any): void {
        StorageUtil.store(Storage.COMMON_SERVICE_OPTIONS, { ...anyOptions, ...this.getAllOptionsFromLocalStorage() });
    }
}
