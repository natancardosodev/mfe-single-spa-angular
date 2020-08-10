import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

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

    public getUrlSigfacil(): string {
        return 'https://' + window.location.host;
    }

    /**
     * monta a url base do projeto
     * @static
     * @returns string
     * @memberof UrlUtilService
     */
    public mountUrl(rota: string): string {
        return `${this.env.api}${rota}`;
    }

    /**
     * @static
     * @param {string} resource
     * @param {any} [parameters]
     * @returns
     * @memberof UrlUtilService
     */
    public montarUrlApi(resource: string, parameters?: Record<string, string>, isSigfacil?: boolean): string {
        const queryString = parameters ? this.objectToQueryString(parameters) : '';
        const baseUrl = isSigfacil ? this.getUrlSigfacil() : this.getUrlApiBase();

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
                const resp: string = property.match('\\[]') // eslint-disable-line @typescript-eslint/prefer-regexp-exec
                    ? parameters[property].map((value) => `${property}=${value}`).join('&') // eslint-disable-line @typescript-eslint/prefer-regexp-exec
                    : `${property}=${parameters[property]}`; // eslint-disable-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/prefer-regexp-exec
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
