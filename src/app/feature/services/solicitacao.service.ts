import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AlertService } from 'lib-alert';

import { UrlUtilService } from 'src/app/core/services/url-util.service';
import { BaseService } from 'src/app/core/services/base.service';

import { ListarProcessoInterface } from 'src/app/core/interfaces/dados-processo/listar-processo.interface';
import { SolicitacaoInterface } from 'src/app/core/interfaces/dados-processo/solicitacao.interface';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService extends BaseService {
    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('/', http, urlUtilService, alertService);
    }

    public getListarProcessos = (processo: ListarProcessoInterface): Observable<any> => {
        return this.get('solicitacao', processo);
    };

    public getDadosProcesso = (solicitacao: SolicitacaoInterface): Observable<any> => {
        return this.get('solicitacao/dados-processo', solicitacao);
    };

    public getDadosPessoa = (solicitacao: SolicitacaoInterface): Observable<any> => {
        return this.get('solicitacao/pessoa', solicitacao);
    };

    public getTaxas = (solicitacao: SolicitacaoInterface): Observable<any> => {
        return this.get('solicitacao/taxa', solicitacao);
    };

    public getValorDevido = (solicitacao: SolicitacaoInterface): Observable<any> => {
        return this.get('solicitacao/valor-devido', solicitacao);
    };

    public getDadosDocumento = (solicitacao: SolicitacaoInterface): Observable<any> => {
        return this.get('solicitacao/documento', solicitacao);
    };

    public getPathDocumento = (id: number): Observable<any> => {
        return this.get(`solicitacao/documento/${id}`);
    };

    public getHistorico = (solicitacao: SolicitacaoInterface): Observable<any> => {
        return this.get('solicitacao/historico', solicitacao);
    };

    public getParecer = (id: number): Observable<any> => {
        return this.get(`solicitacao/historico/parecer/${id}`);
    };

    public getObservacao = (solicitacao: SolicitacaoInterface): Observable<any> => {
        return this.get('solicitacao/observacao', solicitacao);
    };

    public getExigencia = (solicitacao: SolicitacaoInterface): Observable<any> => {
        return this.get('solicitacao/exigencia', solicitacao);
    };
}
