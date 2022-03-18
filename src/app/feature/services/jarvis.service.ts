import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { AlertService } from 'lib-ui-interno';

import { UrlUtilService } from '@core/services/url-util.service';
import { BaseService } from '@core/services/base.service';
import { UserInterface } from '@core/interfaces/interno/user-interface';
import { StorageUtil } from '@core/utils/storage.util';
import { StorageEnum } from '@core/enums/sistema/storage.enum';
import { TiposApisEnum } from '@core/enums/sistema/tipo-apis.enum';

@Injectable({
    providedIn: 'root'
})
export class JarvisService extends BaseService {
    private tipoApi = TiposApisEnum.JARVIS;
    private uf: string;
    private dadosUsuario: UserInterface;

    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('/', http, urlUtilService, alertService);
        this.dadosUsuario = StorageUtil.get(StorageEnum.DADOS_USUARIO) as UserInterface;
        this.uf = this.dadosUsuario.estado;
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
