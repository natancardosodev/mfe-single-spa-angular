import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class AssetsService {
    constructor(private http: HttpClient, private envService: EnvService) {}

    public getDadosSigfacil(): Observable<any> {
        const url = `${this.envService.assetsSigfacil}/assets/configs/sigfacil.json`;

        return this.http.get(url);
    }

    public getMockyMe(): Observable<any> {
        const url = `${this.envService.assetsSigfacil}/assets/configs/mocky-me.json`;

        return this.http.get(url);
    }

    public getMockyCep(): Observable<any> {
        const url = `${this.envService.assetsSigfacil}/assets/configs/mocky-cep.json`;

        return this.http.get(url);
    }
}
