import { Injectable } from '@angular/core';

import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { TiposApisEnum } from '@shared/enums/tipo-apis.enum';
import { generateObjectToQueryString } from '@shared/utils/manipulate-data';
import { urlPortalHttps } from '@shared/utils/mount-urls.util';
import { EnvService } from './env.service';

@Injectable({
    providedIn: 'root'
})
export class UrlUtilService {
    constructor(private env: EnvService) {}

    public getUrlApiBase(): string {
        return `${this.env.api}`;
    }

    public getUrlProjeto(rota: string): string {
        return `${this.env.projeto}${rota}`;
    }

    public getUrlSigfacil(isInterno = false): string {
        return `${urlPortalHttps}${isInterno ? '/sigfacil/' : ''}`;
    }

    public montarUrlApi(
        resource: string,
        parameters?: Record<string, string>,
        tiposApisExtras?: TiposApisEnum
    ): string {
        const queryString = parameters ? generateObjectToQueryString(parameters) : '';
        let baseUrl = '';

        switch (tiposApisExtras) {
            case TiposApisEnum.SERVICE_API:
                baseUrl = this.getUrlApiBase();
                break;
            case TiposApisEnum.ASSETS_SIGFACIL:
                baseUrl = this.env.assetsSigfacil;
                break;
            case TiposApisEnum.SIGFACIL:
                baseUrl = this.getUrlSigfacil();
                break;
            case TiposApisEnum.MOCK:
                baseUrl = 'http://localhost:3000';
                break;
            case TiposApisEnum.STATIC:
                return `${this.env.projeto}${RotasEnum.BASE_HREF}assets/mocks${resource}.json`;

            default:
                baseUrl = this.getUrlApiBase();
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
        window.location.href = `${this.getUrlApiBase()}/redirect?url=${urlAtual}`;
    }

    /**
     * @static
     * @returns {string}
     * @memberof UrlUtilService
     */
    public redirectToLogout(): string {
        const urlAtual = window.location.href;
        return `${this.getUrlApiBase()}/redirect/logout?url=${this.getUrlApiBase()}logout?url=${urlAtual}`;
    }
}
