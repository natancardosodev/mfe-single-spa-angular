/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UrlUtilService } from 'src/app/core/services/url-util.service';
import { BaseService } from 'src/app/core/services/base.service';
import { DadosInscricaoInterface } from 'src/app/core/interfaces/pessoa-fisica/dados-inscricao.interface';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService extends BaseService {
    constructor(http: HttpClient, urlUtilService: UrlUtilService) {
        super('/', http, urlUtilService);
    }

    // Passar Interface
    public getListarProcessos = (processo: any): Observable<any> => {
        return this.http.get('https://run.mocky.io/v3/0d667bc1-7ea7-4e60-93f8-cd368925725d');
        // return this.get('solicitacao', processo);
    };

    public getDadosInscricao = (solicitacao: number): Observable<any> => {
        return this.http.get('https://run.mocky.io/v3/def3b0be-8f60-43f0-8c8b-647b0b44d015');
        // return this.get(`inscricao/solicitacao/${solicitacao}`);
    };

    public putDadosInscricao(solicitacao: number, data: DadosInscricaoInterface): Observable<any> {
        return this.put(`inscricao/solicitacao/${solicitacao}`, data);
    }

    public getDadosProcesso = (solicitacao: any): Observable<any> => {
        return this.http.get('https://run.mocky.io/v3/0ff3aa37-c019-414f-a60e-f7c86bf4da6c');
        // return this.get('solicitacao/dados-processo', solicitacao);
    };

    public getDadosPessoa = (solicitacao: any): Observable<any> => {
        return this.http.get('https://run.mocky.io/v3/60d08623-e03c-4753-a1ce-d4f927850b9c');
        // return this.get('solicitacao/pessoa', solicitacao);
    };

    public getDadosDocumento = (solicitacao: any): Observable<any> => {
        return this.http.get('https://run.mocky.io/v3/79d12a42-f70b-43bd-8d5a-131d6ad603b0');
        // return this.get('solicitacao/documento', solicitacao);
    };

    public putIndeferir = (solicitacao: number, dados: any): Observable<any> => {
        return this.put(`solicitacao/indeferir/${solicitacao}`, dados);
    };

    public getObservacao = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/observacao', solicitacao);
    };
}
