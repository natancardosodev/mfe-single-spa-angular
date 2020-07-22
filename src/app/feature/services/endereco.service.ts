import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UrlUtilService } from 'src/app/core/services/url-util.service';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
    providedIn: 'root'
})
export class EnderecoService extends BaseService {
    constructor(http: HttpClient, urlUtilService: UrlUtilService) {
        super('/', http, urlUtilService);
    }

    public getMunicipio = (uf: Record<string, string>): Observable<any> => {
        return this.get('endereco/municipio/', uf);
    };

    public getCep = (cep: string): Observable<any> => {
        return this.get(`endereco/cep/${cep}`);
    };

    public getCepPeloLogradouro = (logradouro: Record<string, string>): Observable<any> => {
        return this.get('endereco/cep/', logradouro);
    };
}
