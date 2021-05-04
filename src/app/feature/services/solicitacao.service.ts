/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AlertService } from 'lib-ui-interno';

import { UrlUtilService } from '@core/services/url-util.service';
import { BaseService } from '@core/services/base.service';
import { DadosInscricaoInterface } from '@core/interfaces/pessoa-fisica/dados-inscricao.interface';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService extends BaseService {
    private urlMock = 'http://localhost:3000/'; // @todo remover variavel quando retirar mock

    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('/', http, urlUtilService, alertService);
    }

    // Passar Interface
    public getListarProcessos = (processo: any): Observable<any> => {
        return this.http.get(this.urlMock + 'grid');
        // return this.get('solicitacao', processo);
    };

    public getDadosInscricao = (solicitacao: number): Observable<any> => {
        return this.http.get(this.urlMock + 'inscricao');
        // return this.get(`inscricao/solicitacao/${solicitacao}`);
    };

    public putDadosInscricao(solicitacao: number, data: DadosInscricaoInterface): Observable<any> {
        return this.put(`inscricao/solicitacao/${solicitacao}`, data);
    }

    public getDadosProcesso = (solicitacao: any): Observable<any> => {
        return this.http.get(this.urlMock + 'processo');
        // return this.get('solicitacao/dados-processo', solicitacao);
    };

    public getDadosPessoa = (solicitacao: any): Observable<any> => {
        return this.http.get(this.urlMock + 'pessoa');
        // return this.get('solicitacao/pessoa', solicitacao);
    };

    public getDadosDocumento = (solicitacao: any): Observable<any> => {
        return this.http.get(this.urlMock + 'documento');
        // return this.get('solicitacao/documento', solicitacao);
    };

    public putIndeferir = (solicitacao: number, dados: any): Observable<any> => {
        return this.put(`solicitacao/indeferir/${solicitacao}`, dados);
    };

    public getObservacao = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/observacao', solicitacao);
    };
}
