import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { TiposApisEnum } from 'lib-vox-shared-codes';
import { AlertService } from 'lib-vox-ui';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { UrlUtilService } from './url-util.service';

@Injectable({
    providedIn: 'root'
})
export class AssetsService extends BaseService {
    private tipoApi = TiposApisEnum.ASSETS_SIGFACIL;

    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('', http, urlUtilService, alertService);
    }

    public getManifest(): Observable<any> {
        return this.get(`/manifest.json?v=${new Date().toISOString()}`, null, this.tipoApi);
    }

    public getDadosSigfacil(): Observable<any> {
        return this.get('/assets/configs/sigfacil.json', null, this.tipoApi);
    }

    public getMockyMe(): Observable<any> {
        return this.get('/assets/configs/mocky-me.json', null, this.tipoApi);
    }

    public getMockyCep(): Observable<any> {
        return this.get('/assets/configs/mocky-cep.json', null, this.tipoApi);
    }
}
