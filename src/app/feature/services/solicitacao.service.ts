import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AlertService } from 'lib-alert';

import { UrlUtilService } from 'src/app/core/services/url-util.service';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService extends BaseService {
    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('/', http, urlUtilService, alertService);
    }

    public getListarProcessos = (processo: any): Observable<any> => {
        return this.get('solicitacao', processo);
    };

    public getDadosProcesso = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/dados-processo', solicitacao);
    };

    public getDadosPessoa = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/pessoa', solicitacao);
    };

    public getTaxas = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/taxa', solicitacao);
    };

    public getValorDevido = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/valor-devido', solicitacao);
    };

    public getDadosDocumento = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/documento', solicitacao);
    };

    public getPathDocumento = (id: number): Observable<any> => {
        return this.get(`solicitacao/documento/${id}`);
    };

    public getHistorico = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/historico', solicitacao);
    };

    public getParecer = (id: number): Observable<any> => {
        return this.get(`solicitacao/historico/parecer/${id}`);
    };

    public getObservacao = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/observacao', solicitacao);
    };

    public getExigencia = (solicitacao: any): Observable<any> => {
        return this.get('solicitacao/exigencia', solicitacao);
    };
}
