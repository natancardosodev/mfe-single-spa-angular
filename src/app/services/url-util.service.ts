import { Inject, Injectable } from '@angular/core';
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
     * @param {Object} [parameters]
     * @returns
     * @memberof UrlUtilService
     */
    public montarUrlApi(resource: string, parameters?: Object) {
        const queryString = parameters ? this.objectToQueryString(parameters) : '';

        return this.getUrlApiBase() + resource + queryString;
    }

    /**
     * retorna o protocolo da URL
     * @static
     * @returns {string}
     * @memberof UrlUtilService
     */
    public getProtocol(): string {
        return window.location.protocol;
    }

    /**
     * retorna o nuSeqPessoa da URL
     * @static
     * @returns {string}
     * @memberof UrlUtilService
     */
    public getNuSeqPessoa(url: any): string {
        return url.split('/').reverse()[1];
    }

    /**
     * transforma um objecto em uma query
     * @static
     * @param {Object} parameters
     * @returns {string}
     * @memberof UrlUtilService
     */
    public objectToQueryString(parameters: Object): string {
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
        window.location.href = `${this.getAuth()}`;
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

    public montarUrlArray(resource: string, parameters: Object) {
        const arrayParametros = Object.keys(parameters).map((property) => {
            if (!isNullOrUndefined(parameters[property])) {
                return property.match('\\[]')
                    ? parameters[property].map((value) => `${property}=${value}`).join('&')
                    : `${property}=${parameters[property]}`;
            }
        });
        const queryString = `?${arrayParametros.join('&')}`;

        return this.getUrlApiBase() + resource + queryString;
    }

    public getAuth(): string {
        return `${this.env.oauth}`;
    }
}
