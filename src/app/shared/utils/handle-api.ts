import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { MensagensEnum } from '@shared/enums/mensagens.enum';
import { Observable, throwError } from 'rxjs';
import { disableBlockReloadPage } from './generals.util';

export function throwErrorAPI(msg?: string, url = ''): Observable<never> {
    return msg ? throwError(msg) : throwError(new Error('Erro da API ' + url));
}

export function tratarErroLogin(erro: HttpErrorResponse): Observable<never> {
    if (erro.status === 401 || erro.status === 404) {
        return throwError({ naoAutorizado: true });
    }
    throwErrorAPI();
}

export function catchErrorApi(httpError: HttpErrorResponse, isHideAlert: boolean) {
    const msgDefault = {
        message: MensagensEnum.API_FORA
    };

    if ([0, HttpStatusCode.Unauthorized].includes(httpError.status)) {
        disableBlockReloadPage();
    }
    const errorMsg = Array.isArray(httpError.error?.error) ? httpError.error?.error[0] : httpError.error;

    return !isHideAlert ? ([0, HttpStatusCode.Unauthorized].includes(httpError.status) ? msgDefault : errorMsg) : null;
}
