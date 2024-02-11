/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertService } from '@core/components/alert/alert.service';

import { BaseService } from '@core/services/base.service';
import { UrlUtilService } from '@core/services/url-util.service';
import { TiposApisEnum } from '@shared/enums/tipo-apis.enum';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SolicitacaoService extends BaseService {
    constructor(http: HttpClient, urlUtilService: UrlUtilService, alertService: AlertService) {
        super('', http, urlUtilService, alertService);
    }

    public getListEquipes = (): Observable<any> => {
        return this.get('/index', null, TiposApisEnum.STATIC);
    };

    public getProjects = (equipe: string): Observable<any> => {
        return this.get('/' + equipe, null, TiposApisEnum.STATIC);
    };

    public getPackageOfProject = (projectId: number, tokenGit: string): Observable<{ content?: string }> => {
        const headers = new HttpHeaders({ 'PRIVATE-TOKEN': tokenGit }); // 'K42jWs8czrfPQ5WEwjd_'

        return this.http.get(
            `https://gitlab.com.br/api/v4/projects/${projectId}/repository/files/package.json?ref=master`,
            { headers: headers }
        );
    };
}
