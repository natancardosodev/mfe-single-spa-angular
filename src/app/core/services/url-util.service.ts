import { Injectable } from '@angular/core';
import { isNullOrUndefined } from '@core/utils/generals.util';

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

    public getUrlBase(env: string, uf: string): string {
        return `${env}.${uf}`;
    }

    public getUrlSigfacil(isInterno = false): string {
        return `https://${window.location.host}${isInterno ? '/sigfacil/' : ''}`;
    }

    public mountUrl(rota: string): string {
        return `${this.env.api}${rota}`;
    }

    public mountUrlAssets(rota = ''): string {
        return `${this.env.assetsSigfacil}${rota}`;
    }

    public mountUrlJarvis(rota = ''): string {
        return `${this.env.jarvis}${rota}`;
    }

    public montarUrlApi(resource: string, parameters?: Record<string, string>, tipoApi?: string): string {
        const queryString = parameters ? this.objectToQueryString(parameters) : '';
        let baseUrl = '';

        switch (tipoApi) {
            case 'jarvis':
                baseUrl = this.mountUrlJarvis();
                break;
            case 'sigfacil':
                baseUrl = this.getUrlSigfacil();
                break;
            default:
                baseUrl = this.getUrlApiBase();
                break;
        }

        return baseUrl + resource + queryString;
    }

    /**
     * transforma um objeto em uma query
     * @static
     * @param {any} parameters
     * @returns {string}
     * @memberof UrlUtilService
     */
    public objectToQueryString(parameters: Record<string, string>): string {
        const arrayParametro = [];

        for (const property of Object.keys(parameters)) {
            if (!isNullOrUndefined(parameters[property])) {
                arrayParametro.push(`${property}=${parameters[property]}`);
            }
        }

        return `?${arrayParametro.join('&')}`;
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

    public montarUrlArray(resource: string, parameters: Record<string, Array<string>>): string {
        const arrayParametros = Object.keys(parameters).map((property: string) => {
            if (!isNullOrUndefined(parameters[property])) {
                const resp: string = property.match('\\[]')
                    ? parameters[property].map((value) => `${property}=${value}`).join('&')
                    : `${property}=${parameters[property]}`;
                return resp;
            }
        });
        const queryString = `?${arrayParametros.join('&')}`;

        return this.getUrlApiBase() + resource + queryString;
    }

    public getAuth(): string {
        return `${this.env.oauth}`;
    }
}
