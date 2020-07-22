import { HttpUtil } from '../../core/utils/http-util';
import { RespostaPesquisa } from '../../core/interfaces/resposta-pesquisa-interface';
import { UrlUtilService } from '../url-util.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NovaFuncionalidadeService {
    constructor(private http: HttpClient, private urlUtilService: UrlUtilService) {}

    public pesquisar(parameters: object): Observable<{} | RespostaPesquisa> {
        //const url = this.urlUtilService.mountUrl(this.rotas(parameters));
        const url = 'https://www.mocky.io/v2/5de6bda9370000a21d0925c3';

        return this.http
            .get<RespostaPesquisa>(url, { withCredentials: true, responseType: 'json' })
            .pipe(catchError((erro) => HttpUtil.tratarErro(erro)));
    }

    private rotas(params: any): string {
        const urlCpf = params.cpfMembroQsa && params.cpfMembroQsa.replace(/\D*/g, '');
        const urlCnpj = params.cnpj && params.cnpj.replace(/\D*/g, '');
        const urlNumeroRegistro = params.numeroRegistro;
        const urlEmpresarial = params.nomeEmpresarial;

        if (urlCpf) {
            return `/pesquisa/cpf/${urlCpf}`;
        }

        if (urlCnpj || urlNumeroRegistro) {
            return `/pesquisa/numero-registro/${urlCnpj || urlNumeroRegistro}`;
        }

        if (urlEmpresarial) {
            return `/pesquisa/razao-social/${urlEmpresarial}`;
        }

        return '/';
    }

    public getCards(id: string): Observable<any> {
        //const url = this.urlUtilService.montarUrlApi(`/cards/${id}`);
        const url = 'https://www.mocky.io/v2/5de90c8831000039b56b16a2';

        return this.http
            .get<any>(url, { withCredentials: true, responseType: 'json' })
            .pipe(catchError((erro) => HttpUtil.tratarErro(erro)));
    }
}
