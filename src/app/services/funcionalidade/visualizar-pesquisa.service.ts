import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { HttpUtil } from '../../core/utils/http-util';
import { UrlUtilService } from '../url-util.service';

@Injectable({
    providedIn: 'root'
})
export class VisualizarPesquisaService {
    constructor(private http: HttpClient, private urlUtilService: UrlUtilService) {}

    public getCards(id: string): Observable<any> {
        //const url = this.urlUtilService.montarUrlApi(`/cards/${id}`);
        const url = 'https://www.mocky.io/v2/5de90c8831000039b56b16a2';

        return this.http
            .get<any>(url, { withCredentials: true, responseType: 'json' })
            .pipe(catchError((erro) => HttpUtil.tratarErro(erro)));
    }
}
