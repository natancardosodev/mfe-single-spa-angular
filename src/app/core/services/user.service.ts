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
    private _checkModuloMenu: Subject<any>;
    private _user: Observable<User>;
    private _setUserInfo: Subject<User>;

    constructor(private http: HttpClient, private urlUtilService: UrlUtilService) {
        this._setUserInfo = new Subject();
        this._checkModuloMenu = new Subject();
        this._user = this._setUserInfo.asObservable();
    }

    /**
     * serviço que busca o usuário logado
     * @returns {Observable<UserService>}
     * @memberof UsuarioService
     */
    public getUser(): Observable<User> {
        const url = 'https://run.mocky.io/v3/ac0fac47-5e5e-4ef2-bb2c-1b2c5cacdfa1';
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
        return this._user;
    }

    /**
     * Retorna a logo da entidade
     * @returns {Observable<string>}
     * @memberof UserService
     */
    public getPathLogo(): Observable<string> {
        const url = 'https://run.mocky.io/v3/e107dd8e-1962-4823-ab67-534359f5f677';
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
        const url = 'https://run.mocky.io/v3/f1f807e3-2f98-4836-9c1a-ad3584806274';
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
    public getSystem(): Observable<Array<SystemInterface>> {
        const url = 'https://run.mocky.io/v3/a544f110-af96-4f2e-8c93-3d566e3f5a46';
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
    public getModulos(): Observable<Array<Menu>> {
        const url = 'https://run.mocky.io/v3/fb4aa8b9-282e-42df-bb2f-b1c292be3fef';
        //const url = this.urlUtilService.mountUrl('/me/menu/4');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return this.http
            .get<Array<Menu>>(url, { withCredentials: true, responseType: 'json' })
            .pipe(
                map((modulo) => {
                    this._checkModuloMenu.next(modulo);
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
    public get checkModuloMenu(): Observable<Array<Menu>> {
        return this._checkModuloMenu.asObservable();
    }

    /**
     * Checar se na funcionalidade acessada o usuário tem o papel com
     * permissão de acesso (Alterar, excluir, etc) para essa funcionalidade
     * @param papelUsuario
     * @param funcionalidadeAtual
     * @param permissao
     */
    // public checkPermissao(papelUsuario: Array<string>, funcionalidadeAtual: number, permissaoAtual: string): void {
    //     // @todo A FAZER
    // }
}
