import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { RotasEnum } from '@core/enums/rotas.enum';

export function delay(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isEmpty(dado: Record<string, string>): boolean {
    return !Object.keys(dado).length;
}

export function isNullOrUndefined(value: any) {
    return value === null || value === undefined;
}

export function navigate(routerInstance: Router, rotaAlvo: RotasEnum, routeParam: string | number = null) {
    const comandos = routeParam ? [].concat(rotaAlvo, routeParam) : [rotaAlvo];
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

export function montarUrlPortais(env: Array<string>, baseHref: string): string {
    const urls = env.map((ambiente) => {
        return `https://${ambiente}.voxtecnologia.com.br/${baseHref}`;
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

export function throwErrorAPI(): Observable<never> {
    return throwError(new Error('Erro da API'));
}

export function tratarErroLogin(erro: HttpErrorResponse): Observable<never> {
    if (erro.status === 401 || erro.status === 404) {
        return throwError({ naoAutorizado: true });
    }
    throwErrorAPI();
}
