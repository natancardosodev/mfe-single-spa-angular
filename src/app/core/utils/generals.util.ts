import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { RotasEnum } from '@core/enums/interno/rotas.enum';
import { environment } from 'src/environments/environment';

export function delay(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isEmpty(dado: Record<string, any>): boolean {
    return !Object.keys(dado).length;
}

export function isArrayEmpty(...arrays: Array<any> | null): boolean {
    return arrays.join('').length === 0;
}

export function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
}

export function navigate(
    routerInstance: Router,
    rotaAlvo: RotasEnum,
    routeParam: string | number = null,
    state: any = null
) {
    const comandos = routeParam ? [].concat(rotaAlvo, routeParam) : [rotaAlvo];
    if (state) {
        void routerInstance.navigate(comandos, { state: state });
        return;
    }
    void routerInstance.navigate(comandos);
}

export function cleanParams(params: any): any {
    if (params) {
        Object.keys(params).forEach((key) => {
            if (params[key] && typeof params[key] === 'object') cleanParams(params[key]);
            else if (params[key] === undefined) delete params[key];
        });
    }

    return params;
}

export function removeEmpty(obj: any): any {
    Object.keys(obj).forEach(function (key) {
        (obj[key] && typeof obj[key] === 'object' && removeEmpty(obj[key])) ||
            ((obj[key] === '' || obj[key] === null) && delete obj[key]);
    });
    return obj;
}

export function montarUrlPortais(env: Array<string>, baseHref: string): string {
    const urls = env.map((ambiente) => {
        return `https://${ambiente}.voxtecnologia.com.br${baseHref}`;
    });

    // eslint-disable-next-line @typescript-eslint/quotes
    return `'${urls.toString().split(',').join("', '")}'`;
}

export function idGenerator(label: string, idExtra?: number): string {
    if (label === undefined) {
        const radomNumber = Math.floor(Math.random() * 100);
        return `field-${radomNumber}`;
    }

    label = idExtra !== undefined ? `${label}-${idExtra.toString()}` : label;

    return label
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\ +/g, '-')
        .replace(/\//g, '-')
        .replace(/\./g, '')
        .toLowerCase();
}

export function throwErrorAPI(msg?: string): Observable<never> {
    return msg ? throwError(msg) : throwError(new Error('Erro da API'));
}

export function tratarErroLogin(erro: HttpErrorResponse): Observable<never> {
    if (erro.status === 401 || erro.status === 404) {
        return throwError({ naoAutorizado: true });
    }
    throwErrorAPI();
}

export function generateQueryParamsByObject(obj: Record<any, any>): string {
    let params = '?';
    const tamanhoObj = Object.keys(obj).length;

    if (tamanhoObj) {
        Object.keys(obj).forEach((key, index) => {
            params = `${params}${key}=${obj[key]}${index + 1 < tamanhoObj ? '&' : ''}`;
        });
    }

    return tamanhoObj ? params : '';
}

export function generateObjectToQueryString(parameters: Record<string, string>): string {
    const arrayParametro = [];

    for (const property of Object.keys(parameters)) {
        if (!isNullOrUndefined(parameters[property])) {
            arrayParametro.push(`${property}=${parameters[property]}`);
        }
    }

    return `?${arrayParametro.join('&')}`;
}

export function clearMask(value: string): string {
    const regexClearMask = /\.|\(|\)|\-|\_|\s|\/+/g;

    return value && value.replace(regexClearMask, '');
}

export function isProd(): boolean {
    return environment.uri.subDomain === 'www';
}
