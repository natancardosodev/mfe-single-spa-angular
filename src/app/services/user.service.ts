import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isUndefined } from 'util';

import { map, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError, Subscription } from 'rxjs';

import { Menu } from 'lib-menu';

import { HttpUtil } from '../util/http-util';
import { UrlUtilService } from './url-util.service';
import { UsuarioLogadoInterface } from './../interfaces/usuario-logado.interface';
import { SystemInterface } from './../interfaces/system.interface';
import { StorageUtil } from './../util/storage.util';

@Injectable({
    providedIn: 'root'
})

export class UserService {

    private _checkModuloMenu: Subject<any>;
    private user: Observable<UsuarioLogadoInterface>;
    private setUserInfo: Subject<any>;


    constructor(
      private http: HttpClient,
      private urlUtilService: UrlUtilService
    ) {
        this.setUserInfo = new Subject();
        this._checkModuloMenu = new Subject();
        this.user = this.setUserInfo.asObservable();

    }

    /**
     * serviço que busca o usuário logado
     * @returns {Observable<UserService>}
     * @memberof UsuarioService
     */
    public getUser(): Observable<UsuarioLogadoInterface> {
        const url = 'https://www.mocky.io/v2/5b23f0fb2f00007d00e097c4';
        //const url = this.urlUtilService.mountUrl('/me');
        return this.http.get<UsuarioLogadoInterface>(url, { withCredentials: true, responseType: 'json' }).pipe(
            catchError((error: HttpErrorResponse) => HttpUtil.tratarErroLogin(error))
        );
    }
    /**
     *
     * @returns
     * @memberof UserService
     */
    public getUserInfo() {
        return this.user;
    }

    /**
     *
     *
     * @returns {Subscription}
     * @memberof UserService
     */
    public logarService(): Subscription {
        return this.getUser().subscribe(
             resposta => {
                StorageUtil.store('user', resposta);
                this.setUserInfo.next(resposta);
                this.setUserInfo.complete();

                return isUndefined(resposta['mensagem']) || this.urlUtilService.redirectToLogin(window.location.href);
             },
             (error) => {
                 this.setUserInfo.error(error);
                 return error.naoAutorizado && this.urlUtilService.redirectToLogin(window.location.href);
             }
         );
     }

    /**
     * Retorna a logo da entidade
     * @returns {Observable<string>}
     * @memberof UserService
     */
    public getPathLogo(): Observable<string> {
        const url = 'https://www.mocky.io/v2/5c98e8913200007402d906ab';
        //const url = this.urlUtilService.mountUrl('/me/logo-entidade');
        return this.http.get(url, { withCredentials: true, responseType: 'text' })
            .pipe(catchError(erro => {
                    if (erro.status === 404) {
                        console.warn(erro.message);
                        return throwError({naoAutorizado: true});
                    }
                    return HttpUtil.tratarErroLogin(erro);
                }
            ));
    }

    /**
     *
     * @returns {(Observable<string>)}
     * @memberof TimeService
     */
    public getTime(): Observable<string> {
        const url = 'https://www.mocky.io/v2/5b63630630000052006503ef';
        //const url = this.urlUtilService.mountUrl('/hora');
        return this.http.get<string>(url, { withCredentials: true, responseType: 'json' })
            .pipe(catchError(erro => HttpUtil.tratarErroLogin(erro)));
    }

    /**
     * Retorna os sistemas disponíveis para o usuário
     * @returns {Observable<SystemInterface[]>}
     * @memberof SystemAvailableService
     */
    public getSystem(): Observable<SystemInterface[]> {
        const url = 'https://www.mocky.io/v2/5b645c5b2e00008d00414025';
        //const url = this.urlUtilService.mountUrl('/me/sistema');
        return this.http
        .get<Array<SystemInterface>>(url, { withCredentials: true, responseType: 'json' })
            .pipe(catchError(erro => HttpUtil.tratarErroLogin(erro)));
    }
    /**
     *
     * @returns {Observable<Menu[]>}
     *
     * @memberof UserService
     */
    public getModulos(): Observable<Menu[]> {
        const url = 'https://www.mocky.io/v2/5c50979b34000056001299cb';
        //const url = this.urlUtilService.mountUrl('/me/menu/4');
        return this.http.get<Array<Menu>>(url, { withCredentials: true, responseType: 'json' })
        .pipe(
            map(modulo => {
                this._checkModuloMenu.next(modulo);
                return modulo.filter(moduloMenu => this.setModulos(moduloMenu));
            }),
            catchError(erro => HttpUtil.tratarErroLogin(erro))
        );
    }
    /**
     * @param {any} param
     * @returns {Menu}
     * @memberof UserService
     */
    public setModulos(param: any): Menu {
        return param.funcionalidades.map(
            (menu) => menu.rota);
    }

    /**
     * @readonly
     * @type {Observable<Menu[]>}
     * @memberof UserService
     */
    public get checkModuloMenu(): Observable<Menu[]> {
        return this._checkModuloMenu.asObservable();
    }

}
