/**
 * Arquivo para conversões, formatações e checagem de dados
 */

import { Dados } from '../interfaces/dados.interface';

export function isEmpty(dado: Record<string, any>): boolean {
    return dado && !Object.keys(dado).length;
}

export function isArrayEmpty(...arrays: Array<any> | null): boolean {
    return arrays.join('').length === 0;
}

export function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
}

export function removeNullValues(dado: Record<string, any>): Record<string, any> | null {
    Object.keys(dado).forEach((key) => {
        if (dado[key] === null) {
            delete dado[key];
        }
    });
    return dado;
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

export function clearMask(value: string): string | null {
    const regexClearMask = /\.|\(|\)|\-|\_|\s|\/+/g;

    const result = value && value.toString().replace(regexClearMask, '');

    return result !== '' ? result : null;
}

export function isNumeric(value: string | number): boolean {
    return /^-?\d+$/.test(value.toString());
}

export function formatForCurrencyReal(valor: number): string {
    const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    return formatter.format(valor);
}

/**
 * DEPRECATED
 * Use generateObjectToQueryString()
 * @param parameters
 * @returns
 */
export function objectToQueryString(parameters: Record<string, string>): string {
    // eslint-disable-next-line no-console
    console.warn('Troque objectToQueryString() para generateObjectToQueryString()');
    return generateObjectToQueryString(parameters);
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

export function generateObjectToArrayDados(parameters: Record<string, string>): Array<Dados> {
    const arrayParametro = [];
    for (const property of Object.keys(parameters)) {
        if (!isNullOrUndefined(parameters[property])) {
            arrayParametro.push({ key: property, value: parameters[property] });
        }
    }

    return arrayParametro;
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

export function montarUrlArray(domain: string, resource: string, parameters: Record<string, Array<string>>): string {
    const arrayParametros = Object.keys(parameters).map((property: string) => {
        if (!isNullOrUndefined(parameters[property])) {
            const resp: string = property.match('\\[]')
                ? parameters[property].map((value) => `${property}=${value}`).join('&')
                : `${property}=${parameters[property]}`;
            return resp;
        }
    });
    const queryString = `?${arrayParametros.join('&')}`;

    return domain + resource + queryString;
}
