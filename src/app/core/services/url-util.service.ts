import { Injectable } from '@angular/core';

import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { TiposApisEnum } from '@shared/enums/tipo-apis.enum';
import { generateObjectToQueryString } from '@shared/utils/manipulate-data';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class UrlUtilService {
    constructor(private env: EnvService) {}

    public montarUrlApi(
        resource: string,
        parameters?: Record<string, string>,
        tiposApisExtras?: TiposApisEnum
    ): string {
        const queryString = parameters ? generateObjectToQueryString(parameters) : '';
        let baseUrl = '';

        switch (tiposApisExtras) {
            case TiposApisEnum.SERVICE_API:
                baseUrl = this.env.api;
                break;
            case TiposApisEnum.ASSETS_SIGFACIL:
                baseUrl = this.env.cdn;
                break;
            case TiposApisEnum.MOCK:
                baseUrl = 'http://localhost:3000';
                break;
            case TiposApisEnum.STATIC:
                return `${RotasEnum.BASE_HREF}assets/mocks${resource}.json`;

            default:
                baseUrl = this.env.api;
                break;
        }

        return baseUrl + resource + queryString;
    }

    /**
     *
     * @static
     * @param {string} targetPath
     * @memberof UrlUtilService
     */
    public redirectToLogin(): void {
        const urlAtual = window.location.href;
        window.location.href = `${this.env.api}/redirect?url=${urlAtual}`;
    }

    /**
     * @static
     * @returns {string}
     * @memberof UrlUtilService
     */
    public redirectToLogout(): string {
        const urlAtual = window.location.href;
        return `${this.env.api}/redirect/logout?url=${this.env.api}logout?url=${urlAtual}`;
    }
}
