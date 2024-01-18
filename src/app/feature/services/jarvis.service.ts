import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AlertService } from 'lib-vox-ui';
import { Observable } from 'rxjs';

import { BaseService } from '@core/services/base.service';
import { UrlUtilService } from '@core/services/url-util.service';
import { TiposApisEnum } from 'lib-vox-shared-codes';

@Injectable({
    providedIn: 'root'
})
export class JarvisService extends BaseService {
    private tipoApi = TiposApisEnum.JARVIS;
    private uf: string;

    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('/', http, urlUtilService, alertService);
    }

    /**
     * group: 'all' - dados completos / 'app' - dados resumidos
     **/
    public getPessoaCpf = (cpf: string, group = 'app'): Observable<any> => {
        return this.get(`gateway/receita/s09/${this.uf}/${cpf}/${group}`, null, this.tipoApi);
    };

    public getExigencias = (orgao: number): Observable<any> => {
        return this.get(`exigencia/combo/${orgao}`, null, this.tipoApi);
    };

    public getOptionsMunicipio = (ds_sigla: string): Observable<any> => {
        return this.get(`municipio/combo/${ds_sigla}`, null, this.tipoApi);
    };

    public getOptionsMunicipioByCoUf = (co_uf: number): Observable<any> => {
        return this.get(`municipio/codigo/combo/${co_uf}`, null, this.tipoApi);
    };
}
