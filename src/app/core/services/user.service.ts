import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { map, catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

import { Menu } from 'lib-menu';

import { HttpUtil } from '../../core/utils/http-util';
import { UrlUtilService } from './url-util.service';
import { User } from '../interfaces/interno/user-interface';
import { SystemInterface } from '../interfaces/interno/system-interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private $checkModuloMenu: Subject<any>;
    private $user: Observable<User>;
    private $setUserInfo: Subject<User>;

    constructor(private http: HttpClient, private urlUtilService: UrlUtilService) {
        this.$setUserInfo = new Subject();
        this.$checkModuloMenu = new Subject();
        this.$user = this.$setUserInfo.asObservable();
    }

    /**
     * serviço que busca o usuário logado
     * @returns {Observable<UserService>}
     * @memberof UsuarioService
     */
    public getUser(): Observable<User> {
        const url = 'https://www.mocky.io/v2/5b23f0fb2f00007d00e097c4';
        // const url = this.urlUtilService.mountUrl('/me');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.http
            .get<User>(url, { withCredentials: true, responseType: 'json' })
            .pipe(catchError((error: HttpErrorResponse) => HttpUtil.tratarErroLogin(error)));
    }

    /**
     *
     * @returns
     * @memberof UserService
     */
    public getUserInfo(): Observable<User> {
        return this.$user;
    }

    /**
     * Retorna a logo da entidade
     * @returns {Observable<string>}
     * @memberof UserService
     */
    public getPathLogo(): Observable<string> {
        const url = 'https://www.mocky.io/v2/5c98e8913200007402d906ab';
        // const url = this.urlUtilService.mountUrl('/me/logo-entidade');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.http.get(url, { withCredentials: true, responseType: 'text' }).pipe(
            catchError((erro: HttpErrorResponse) => {
                if (erro.status === 404) {
                    window.console.warn(erro.message);
                    return throwError({ naoAutorizado: true });
                }
                return HttpUtil.tratarErroLogin(erro);
            })
        );
    }

    /**
     *
     * @returns {(Observable<string>)}
     * @memberof TimeService
     */
    public getTime(): Observable<string> {
        const url = 'https://www.mocky.io/v2/5b63630630000052006503ef';
        // const url = this.urlUtilService.mountUrl('/hora');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.http
            .get<string>(url, { withCredentials: true, responseType: 'json' })
            .pipe(catchError((erro) => HttpUtil.tratarErroLogin(erro)));
    }

    /**
     * Retorna os sistemas disponíveis para o usuário
     * @returns {Observable<SystemInterface[]>}
     * @memberof SystemAvailableService
     */
    public getSystem(): Observable<SystemInterface[]> {
        const url = 'https://www.mocky.io/v2/5b645c5b2e00008d00414025';
        // const url = this.urlUtilService.mountUrl('/me/sistema');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.http
            .get<Array<SystemInterface>>(url, { withCredentials: true, responseType: 'json' })
            .pipe(catchError((erro) => HttpUtil.tratarErroLogin(erro)));
    }

    /**
     *
     * @returns {Observable<Menu[]>}
     *
     * @memberof UserService
     */
    public getModulos(): Observable<Menu[]> {
        const url = 'https://www.mocky.io/v2/5e16301b34000070eb406a2c';
        //const url = this.urlUtilService.mountUrl('/me/menu/4');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.http
            .get<Array<Menu>>(url, { withCredentials: true, responseType: 'json' })
            .pipe(
                map((modulo) => {
                    this.$checkModuloMenu.next(modulo);
                    return modulo.filter((moduloMenu) => this.setModulos(moduloMenu));
                }),
                catchError((erro) => HttpUtil.tratarErroLogin(erro))
            );
    }

    /**
     * @param {any} param
     * @returns {Menu}
     * @memberof UserService
     */
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    public setModulos(param: any): Menu {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        return param.funcionalidades.map((menu) => menu.rota);
    }

    /**
     * @readonly
     * @type {Observable<Menu[]>}
     * @memberof UserService
     */
    public get checkModuloMenu(): Observable<Menu[]> {
        return this.$checkModuloMenu.asObservable();
    }
}
