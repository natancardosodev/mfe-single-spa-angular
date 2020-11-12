import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { UrlUtilService } from '../../core/services/url-util.service';
import { BaseService } from '../../core/services/base.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Injectable({
    providedIn: 'root'
})
export class JarvisService extends BaseService {
    private tipoApi = 'jarvis';
    private uf: string;

    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('/', http, urlUtilService, alertService);
        this.uf = 'PB'; // @todo corrigir getUf
    }

    /**
     * group: 'all' - dados completos / 'app' - dados resumidos
     **/
    public getPessoaCpf = (cpf: string, group = 'app'): Observable<any> => {
        return this.get(`gateway/receita/s09/${this.uf}/${cpf}/${group}`, null, this.tipoApi, true);
    };
}
