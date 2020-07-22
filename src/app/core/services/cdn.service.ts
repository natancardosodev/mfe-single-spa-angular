import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CdnService {
    public urlCdn: string;

    constructor(private http: HttpClient) {}

    public getUrlCdn(environment: string): string {
        this.urlCdn =
            environment == 'www'
                ? `https://cdn-sigfacil.voxtecnologia.com.br`
                : `https://${environment}-cdn-sigfacil.voxtecnologia.com.br`;

        return this.urlCdn;
    }

    public getDadosSigfacil(enviromnent: string): Observable<any> {
        const url = `${this.getUrlCdn(enviromnent)}/assets/configs/sigfacil.json`;

        return this.http.get(url);
    }

    public getMockyMe(enviromnent: string): Observable<any> {
        const url = `${this.getUrlCdn(enviromnent)}/assets/configs/mocky-me.json`;

        return this.http.get(url);
    }

    public getMockyCep(enviromnent: string): Observable<any> {
        const url = `${this.getUrlCdn(enviromnent)}/assets/configs/mocky-cep.json`;

        return this.http.get(url);
    }
}
