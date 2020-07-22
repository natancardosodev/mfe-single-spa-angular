import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UrlUtilService } from 'src/app/core/services/url-util.service';
import { BaseService } from 'src/app/core/services/base.service';

import { ProcessoInterface } from 'src/app/core/interfaces/processo.interface';
import { LeiloeiroInterface } from 'src/app/core/interfaces/leiloeiro.interface';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService extends BaseService {
    constructor(http: HttpClient, urlUtilService: UrlUtilService) {
        super('/', http, urlUtilService);
    }

    public postSolicitacao = (solicitacao: LeiloeiroInterface): Observable<any> => {
        return this.post('solicitacao', solicitacao);
    };

    public getSolicitacaoPorCpf = (cpf: string): Observable<any> => {
        return this.get(`solicitacao-pessoa-fisica/${cpf}`);
    };

    public getProcesso = (processo: ProcessoInterface): Observable<any> => {
        return this.get('dados-processo', processo);
    };

    public getPessoaPorCpf = (cpf: string): Observable<any> => {
        return this.get(`pessoa-fisica/${cpf}`);
    };

    public getStatusSolicitacao = (solicitacao: number): Observable<any> => {
        return this.get(`solicitacao/status/${solicitacao}`);
    };
}
