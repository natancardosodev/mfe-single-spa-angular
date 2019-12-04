import { throwError, Observable } from 'rxjs';

import { ClazzOrModelSchema } from 'serializr';
import { Serializer } from './adapter/serializer';
import { HttpErrorResponse } from '@angular/common/http';

export class HttpUtil {

  /**
   * método que trata a resposta do serviço
   * @static
   * @template T
   * @param {ClazzOrModelSchema<T>} modelSchema
   * @param {*} res
   * @returns {*}
   * @memberof HttpUtil
   */
  public static tratarResposta<T>(modelSchema: ClazzOrModelSchema<T>, res: any): any {
      return Serializer.deserialize(modelSchema, res);
    }

    /**
     * método que trata o erro dos serviços
     * @static
     * @param {any} erro
     * @returns
     * @memberof HttpUtil
     */
    public static tratarErro(erro: HttpErrorResponse): Observable<any> {
        let erroMessage = 'Ocorreu um erro na requisição';

        try {
            const [{message}] = erro.error.error.exception;
            erroMessage = message;
        } catch (e) {
            erroMessage = 'Ocorreu um erro inesperado';
        }

        return throwError(new Error(erroMessage));
    }

    public static tratarErroLogin(erro: HttpErrorResponse): Observable<any> {
        const erroMessage = erro.error['mensagem'] || 'Ocorreu um erro na requisição';

        if (erro.status === 401) {
            return throwError({naoAutorizado: true});
        }

        return throwError(new Error(erroMessage));

    }
}
