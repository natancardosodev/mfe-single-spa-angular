/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AlertService } from 'lib-ui-interno';

import { UrlUtilService } from '@core/services/url-util.service';
import { BaseService } from '@core/services/base.service';
import { DadosInscricaoInterface } from '@core/interfaces/pessoa-fisica/dados-inscricao.interface';
import { TiposApisEnum } from '@core/enums/tipo-apis.enum';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService extends BaseService {
    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('', http, urlUtilService, alertService);
    }

    // Passar Interface
    public getListarProcessos = (processo: any): Observable<any> => {
        // return this.get('/solicitacao', processo);
        return this.get('/grid', null, TiposApisEnum.MOCK); // @todo remover parametro MOCK
    };

    public getDadosInscricao = (solicitacao: number): Observable<any> => {
        return this.get(`/inscricao`, null, TiposApisEnum.MOCK); // `/inscricao/solicitacao/${solicitacao}`
    };

    public putDadosInscricao(solicitacao: number, data: DadosInscricaoInterface): Observable<any> {
        return this.put(`/inscricao/solicitacao/${solicitacao}`, data);
    }

    public getDadosProcesso = (solicitacao: any): Observable<any> => {
        return this.get('/processo', null, TiposApisEnum.MOCK);
    };

    public getDadosPessoa = (solicitacao: any): Observable<any> => {
        // return this.get('/pessoa', solicitacao);
        return this.get('/pessoa', null, TiposApisEnum.MOCK);
    };

    public getDadosDocumento = (solicitacao: any): Observable<any> => {
        return this.get('/documento', null, TiposApisEnum.MOCK);
    };

    public putIndeferir = (solicitacao: number, dados: any): Observable<any> => {
        return this.put(`/solicitacao/indeferir/${solicitacao}`, dados);
    };

    public postDados = (dados: any): Observable<any> => {
        return this.post(`/solicitacao/dados`, dados);
    };

    public getObservacao = (solicitacao: any): Observable<any> => {
        return this.get('/solicitacao/observacao', solicitacao);
    };
}
