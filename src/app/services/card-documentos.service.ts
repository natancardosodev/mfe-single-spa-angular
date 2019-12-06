import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HttpUtil } from 'lib-cards-genericos';
import { UrlUtilService } from './url-util.service';

@Injectable({
  providedIn: 'root'
})
export class CardDocumentosService {

  constructor(
    private http: HttpClient,
    private urlUtilService: UrlUtilService
  ) { }

  public getAnexosDocumentos(): Observable<any> {
    //const url = this.urlUtilService.montarUrlApi(`/lista-documentos`);
    const url = 'https://www.mocky.io/v2/5de93d5831000063006b17f4';
    return this.http.get<any>(url, { withCredentials: true, responseType: 'json' }).pipe(
      catchError((error: HttpErrorResponse) => HttpUtil.tratarErro(error))
    );
  }
}
