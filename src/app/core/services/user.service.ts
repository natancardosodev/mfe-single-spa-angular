import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// import { map, catchError } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

import { Menu } from 'lib-menu';

import { User } from '../interfaces/interno/user-interface';
import { SystemInterface } from '../interfaces/interno/system-interface';
import { UserMocky } from '../mockys/interno/user-mocky';
import { PathLogoMocky } from '../mockys/interno/path-logo-mocky';
import { HoraMocky } from '../mockys/interno/hora-mocky';
import { SystemMocky } from '../mockys/interno/system-mocky';
import { ModulosMocky } from '../mockys/interno/modulos-mocky';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _checkModuloMenu: Subject<any>;
    private _user: Observable<User>;
    private _setUserInfo: Subject<User>;

    constructor(private http: HttpClient) {
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
        // const url = this.urlUtilService.mountUrl('/me');
        // return this.http
        //     .get<User>(url, { withCredentials: true, responseType: 'json' })
        //     .pipe(catchError((error: HttpErrorResponse) => throwError(new Error(error.error.message))));
        // @todo retirar comentários quando a api estiver integrada, a funcionalidade cadastrada no banco e o usuário habilitado
        return of(UserMocky.data);
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
    public getPathLogo(): Observable<any> {
        // const url = this.urlUtilService.mountUrl('/me/logo-entidade');
        // return this.http.get(url, { withCredentials: true, responseType: 'text' }).pipe(
        //     catchError((erro: HttpErrorResponse) => {
        //         if (erro.status === 404) {
        //             return throwError({ naoAutorizado: true });
        //         }
        //         return throwError(new Error(erro.error.message));
        //     })
        // );
        return of(PathLogoMocky.data);
    }

    /**
     *
     * @returns {(Observable<string>)}
     * @memberof TimeService
     */
    public getTime(): Observable<string> {
        // const url = this.urlUtilService.mountUrl('/hora');
        // return this.http
        //     .get<string>(url, { withCredentials: true, responseType: 'json' })
        //     .pipe(catchError((error: HttpErrorResponse) => throwError(new Error(error.error.message))));
        return of(HoraMocky.data);
    }

    /**
     * Retorna os sistemas disponíveis para o usuário
     * @returns {Observable<SystemInterface[]>}
     * @memberof SystemAvailableService
     */
    public getSystem(): Observable<Array<SystemInterface>> {
        // const url = this.urlUtilService.mountUrl('/me/sistema');
        // return this.http
        //     .get<Array<SystemInterface>>(url, { withCredentials: true, responseType: 'json' })
        //     .pipe(catchError((error: HttpErrorResponse) => throwError(new Error(error.error.message))));
        return of(SystemMocky.data);
    }

    /**
     *
     * @returns {Observable<Menu[]>}
     *
     * @memberof UserService
     */
    public getModulos(): Observable<Array<Menu>> {
        // const url = this.urlUtilService.mountUrl('/me/menu/4');
        // return this.http
        //     .get<Array<Menu>>(url, { withCredentials: true, responseType: 'json' })
        //     .pipe(
        //         map((modulo) => {
        //             this._checkModuloMenu.next(modulo);
        //             return modulo.filter((moduloMenu) => this.setModulos(moduloMenu));
        //         }),
        //         catchError((error: HttpErrorResponse) => throwError(new Error(error.error.message)))
        //     );
        return of(ModulosMocky.data);
    }

    /**
     * @param {any} param
     * @returns {Menu}
     * @memberof UserService
     */
    public setModulos(param: any): Menu {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
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
     * Checar se na funcionalidade acessada o usuário tem algum papel com
     * permissão de acesso (Alterar, excluir, etc) para essa funcionalidade
     */
    public checkPermissaoLiberada(
        dadosUsuario: User,
        funcionalidadeAcessada: number,
        permissaoNecessaria: Array<string>
    ): boolean {
        let hasPermissao = false;
        dadosUsuario.papel.forEach((p) => {
            const papeisUsuario = p.split('_');
            const funcionalidadePermitida = String(papeisUsuario[1]);
            const acessoPermitido = papeisUsuario[2];

            if (String(funcionalidadeAcessada) === funcionalidadePermitida) {
                permissaoNecessaria.filter(() => {
                    if (permissaoNecessaria.indexOf(acessoPermitido) !== -1) {
                        return (hasPermissao = true);
                    }
                });
            }
        });

        return hasPermissao ? true : false;
    }
}
