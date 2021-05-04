import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class AssetsService {
    constructor(private http: HttpClient, private env: EnvService) {}

    public getManifest(): Observable<any> {
        const url = `${this.env.assetsSigfacil}/manifest.json?v=${new Date().toISOString()}`;

        return this.http
            .get<any>(url, { withCredentials: true, responseType: 'json' })
            .pipe<any>(catchError((error: HttpErrorResponse) => void throwError(new Error(error.error.message))));
    }

    public getDadosSigfacil(): Observable<any> {
        const url = `${this.env.assetsSigfacil}/assets/configs/sigfacil.json`;

        return this.http
            .get<any>(url, { withCredentials: true, responseType: 'json' })
            .pipe<any>(catchError((error: HttpErrorResponse) => void throwError(new Error(error.error.message))));
    }

    public getMockyMe(): Observable<any> {
        const url = `${this.env.assetsSigfacil}/assets/configs/mocky-me.json`;

        return this.http
            .get<any>(url, { withCredentials: true, responseType: 'json' })
            .pipe<any>(catchError((error: HttpErrorResponse) => void throwError(new Error(error.error.message))));
    }

    public getMockyCep(): Observable<any> {
        const url = `${this.env.assetsSigfacil}/assets/configs/mocky-cep.json`;

        return this.http
            .get<any>(url, { withCredentials: true, responseType: 'json' })
            .pipe<any>(catchError((error: HttpErrorResponse) => void throwError(new Error(error.error.message))));
    }
}
